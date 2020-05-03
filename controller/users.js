const Users = require('../models/Users');
const catchAsync = require('../utils/catchAsync');
const factory = require('./factoryHandler');

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
