const { promisify } = require('util');
const crypto = require('crypto');
const multer = require('multer');
const sharp = require('sharp');
const jwt = require('jsonwebtoken');

const Users = require('../models/Users');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'public/img/users');
//   },
//   filename: (req, file, cb) => {
//     const photoExt = path.parse(file.originalname).ext;
//     cb(null, `user-${req.user.id}-${Date.now()}.${photoExt}`);
//   }
// });
const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  if (!file) {
    cb('please upload a file', false);
  } else if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError('not an image, Please upload only images', 400), false);
  }
};
const upload = multer({
  storage,
  fileFilter
});

exports.resizeImage = catchAsync(async (req, res, next) => {
  if (!req.file) return next();
  req.file.filename = `user-${req.user.id}-${Date.now()}.jpeg`;
  sharp(req.file.buffer)
    .resize(100, 100)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(`img/users/${req.file.filename}`);
  next();
});

exports.userUpdatePhoto = upload.single('file');

const sendToken = (user, res, statusCode) => {
  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES
  });

  user.password = undefined;
  res.status(statusCode).json({
    success: true,
    token,
    user
  });
};

//@desc   Register Users
//@route  Get api/v1/users/signup
//@access public
exports.signup = catchAsync(async (req, res, next) => {
  const user = await Users.create(req.body);

  sendToken(user, res, 201);
});

//@desc   login Users
//@route  Get api/v1/users/login
//@access public
exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError('email and password are required', 400));
  }

  const user = await Users.findOne({ email }).select('+password');

  if (!user || !(await user.comparePassword(password, user.password))) {
    return next(new AppError(`Invalid credential`, 401));
  }

  sendToken(user, res, 201);
});

//@desc   protect route
//@route  middleware
exports.protect = catchAsync(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(new AppError('you are not logged in', 401));
  }

  const decode = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // check if user exist
  const currentUser = await Users.findById(decode.id).select('+password');

  if (!currentUser) {
    return next(new AppError('user no longer exist', 401));
  }

  if (currentUser.checkpassword(decode.iat)) {
    return next(
      new AppError('this user recently changed his password. login again', 401)
    );
  }

  req.user = currentUser;

  //authorize user
  next();
});

//@desc  user role access
//@route middleware
exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError('You are not authorize to perform this action', 401)
      );
    }
    next();
  };
};

//@desc   Forgot Password
//@route  POST api/v1/users/forgotPassword
//@access public
exports.forgotPassword = catchAsync(async (req, res, next) => {
  if (!req.body.email) {
    return next(new AppError('email field is required', 400));
  }

  const user = await Users.findOne({ email: req.body.email });

  if (!user) {
    return next(new AppError('this email is not registered', 401));
  }

  try {
    await user.forgotPasswordToken();
    await user.save({ validateBeforeSave: false });
    res.status(200).json({
      success: true,
      message: 'a reset password link has being sent to your mail'
    });
  } catch (err) {
    console.log(err);
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });

    return next(
      new AppError('your reset token could not be sent. Please try again', 500)
    );
  }
});

//@desc   reset Password
//@route  PATCH api/v1/users/resetPassword
//@access public
exports.resetPassword = catchAsync(async (req, res, next) => {
  const hashedToken = crypto
    .createHash('sha256')
    .update(req.body.token)
    .digest('hex');

  const user = await Users.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() }
  });

  if (!user) {
    return next(new AppError('Invalid Credentials or Expired Token', 401));
  }

  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();

  // sendToken(user, res, 200);
  res.status(200).json({
    success: true,
    message: 'password reset successfully!'
  });
});

//@desc   Confirm Account
//@route  PATCH api/v1/users/confirmAccount
//@access public
exports.confirmAccount = catchAsync(async (req, res, next) => {
  const { token } = req.body;

  const user = await Users.findOne({ emailConfirmCode: token });

  if (!user) {
    return next(new AppError('Invalid Credentials', 400));
  }

  user.emailConfirmCode = null;
  user.emailConfirmAt = Date.now();
  await user.save({ validateBeforeSave: false });

  sendToken(user, res, 200);
});

//@desc   update Password
//@route  PATCH api/v1/users/resendEmail
//@access private
exports.resendEmail = catchAsync(async (req, res, next) => {
  if (!req.user.emailConfirmAt) {
    await req.user.resendEmailConfirm();
  }

  res.status(200).json({
    success: true,
    msg: 'email confirmation sent'
  });
});
//@desc   update Password
//@route  PATCH api/v1/users/updatePassword
//@access private
exports.updatePassword = catchAsync(async (req, res, next) => {
  const { currentPassword, newPassword, passwordConfirm } = req.body;

  if (!currentPassword || !newPassword) {
    return next(new AppError('all fields are required', 400));
  }

  const user = await Users.findById(req.user.id).select('+password');

  if (!user || !(await user.comparePassword(currentPassword, user.password))) {
    return next(new AppError('Invalid Credentials', 401));
  }

  user.password = newPassword;
  user.passwordConfirm = passwordConfirm;
  await user.save();

  sendToken(user, res, 200);
});

//@desc   Update Users photos
//@route  Patch api/v1/users/photos
//@access private
exports.updatePhotos = catchAsync(async (req, res, next) => {
  let user = await Users.findById(req.user.id);

  if (!user) {
    return next(new AppError('no user found', 400));
  }

  user = await Users.findByIdAndUpdate(
    req.user.id,
    { photo: req.file.filename },
    {
      new: true,
      runValidators: true
    }
  );

  sendToken(user, res, 200);
});

//@desc   Update Users Details
//@route  Patch api/v1/users/
//@access private
exports.updateMe = catchAsync(async (req, res, next) => {
  const details = {
    email: req.body.email,
    name: req.body.name
  };

  if (req.body.password) {
    return next(
      new AppError('you can only update email and name in this route', 401)
    );
  }

  const user = await Users.findByIdAndUpdate(req.user.id, details, {
    new: true,
    runValidators: true
  });

  sendToken(user, res, 200);
});
