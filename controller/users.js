const path = require('path');
const multer = require('multer');
const Users = require('../models/Users');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const factory = require('./factoryHandler');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/img/users');
  },
  filename: (req, file, cb) => {
    const photoExt = path.parse(file.originalname).ext;
    cb(null, `user-${req.user.id}-${Date.now()}.${photoExt}`);
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError('not an image, Please upload only images', 400), false);
  }
};
const upload = multer({
  storage,
  fileFilter
});
exports.userUpdatePhoto = upload.single('photo');

//@desc   Update Users Details
//@route  Patch api/v1/users/
//@access private
exports.updateMe = catchAsync(async (req, res, next) => {
  const { email, name, photo } = req.body;
  console.log(path.parse(req.file.originalname).ext);
  // console.log(req.body);
  if (req.body.password) {
    return next(
      new AppError('you can only update email and name in this route', 401)
    );
  }

  const user = await Users.findByIdAndUpdate(
    req.user.id,
    { email, name, photo },
    {
      new: true,
      runValidators: true
    }
  );

  res.status(200).json({
    success: true,
    data: user
  });
});

//@desc   Delete User
//@route  Delete api/v1/users/
//@access private
exports.deleteMe = catchAsync(async (req, res, next) => {
  await Users.findByIdAndUpdate(req.user.id, { active: false });
  res.status(200).json({
    success: true,
    data: {}
  });
});

//@desc   Get Profile
//@route  Delete api/v1/users/myprofile
//@access private
exports.myprofile = catchAsync(async (req, res, next) => {
  req.params.id = req.user.id;

  next();
});

//@desc   Get All Users
//@route  Get api/v1/users
//@access private
exports.getUsers = factory.getHandler(Users);
//@desc   Get Single User
//@route  Get api/v1/uses/:id
//@access private
exports.getOneUser = factory.getSingleHandler(Users);
//@desc   Create User
//@route  POST api/v1/users/
//@access private
exports.createUser = factory.createHandler(Users);
//@desc   Update User
//@route  POST api/v1/users/:id
//@access private
exports.updateUser = factory.updateHandler(Users);
//@desc   Delete User
//@route  POST api/v1/users/:id
//@access private
exports.deleteUser = factory.deleteHandler(Users);
