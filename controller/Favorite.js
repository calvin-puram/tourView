const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const Tours = require('../models/Tours');
const Favorite = require('../models/Favorite');

exports.createFavorite = catchAsync(async (req, res, next) => {
  req.user.id = req.body.user;
  req.params.id = req.body.tour;
  const favorite = await Favorite.create(req.body);

  res.status(200).json({
    status: 'success',
    data: favorite
  });
});
