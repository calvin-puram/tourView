const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const Tours = require('../models/Tours');
const Favorite = require('../models/Favorite');

exports.createFavorite = catchAsync(async (req, res, next) => {
  const checkFavorite = await Favorite.findOne({ tour: req.params.id });

  if (checkFavorite) {
    return next(new AppError('tour already in users favorite list', 400));
  }

  req.body.tour = req.params.id;
  req.body.user = req.user.id;
  const favorite = await Favorite.create(req.body);

  res.status(200).json({
    status: 'success',
    data: favorite
  });
});

exports.getFavorite = catchAsync(async (req, res, next) => {
  const favorite = await Favorite.find();

  if (!favorite) {
    next(new AppError('user has no favorite tour', 404));
  }

  res.status(200).json({
    count: favorite.length,
    status: true,
    data: favorite
  });
});
