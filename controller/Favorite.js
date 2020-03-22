const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const Tours = require('../models/Tours');
const Favorite = require('../models/Favorite');

// @desc Create Favorite Tours for users
// @route api/v1/favorite/:id
// @access private
exports.createFavorite = catchAsync(async (req, res, next) => {
  req.body.tour = req.params.id;
  req.body.user = req.user.id;
  const favorite = await Favorite.create(req.body);

  res.status(200).json({
    success: true,
    data: favorite
  });
});

// @desc Get all favorites tours
// @route api/v1/favorites
// @access private
exports.getFavorite = catchAsync(async (req, res, next) => {
  const favorite = await Favorite.find();

  if (!favorite) {
    next(new AppError('user has no favorite tour', 404));
  }

  res.status(200).json({
    count: favorite.length,
    success: true,
    data: favorite
  });
});

// @desc Get All User Favorite Tours
// @route api/v1/favorite/:id
// @access private
exports.getUserFavorite = catchAsync(async (req, res, next) => {
  const favorite = await Favorite.find({ user: req.params.id });

  if (!favorite) {
    next(new AppError('user has no favorite tour', 404));
  }

  const toursId = favorite.map(el => el.tour);

  const tours = await Tours.find({ _id: { $in: toursId } });

  res.status(200).json({
    count: favorite.length,
    success: true,
    data: tours
  });
});

// @desc Delete User Favorite Tour
// @route api/v1/favorite/:id
// @access private
exports.deleteFavorite = catchAsync(async (req, res, next) => {});
