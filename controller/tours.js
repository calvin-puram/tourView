const multer = require('multer');
const sharp = require('sharp');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const factory = require('./factoryHandler');
const Tours = require('../models/Tours');

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

exports.uploadTourImages = upload.fields([
  { name: 'imageCover', maxCount: 1 },
  { name: 'images', maxCount: 3 }
]);

exports.checkFile = (req, res, next) => {
  console.log(req.files);
  next();
};
// uploads.array('images', 5);

//@desc   Top Best Cheap Tours
//@route  Get api/v1/tours/top5cheap
//@access public
exports.top5cheap = (req, res, next) => {
  req.query.limit = 5;
  req.query.sort = '-ratingsAverage, price';
  req.query.fields = 'name, price, ratingsAverage, difficulty';
  next();
};

//@desc   Get All Tours
//@route  Get api/v1/tours
//@access public
exports.getTours = factory.getHandler(Tours);
//@desc   Get Single Tours
//@route  Get api/v1/tours/:id
//@access public
exports.getOneTour = catchAsync(async (req, res, next) => {
  const tour = await Tours.findOne({ slug: req.params.slug }).populate({
    path: 'reviews',
    select: 'name photo, review'
  });

  if (!tour) {
    return next(
      new AppError(`No Resource Found With slug: ${req.params.slug}`, 404)
    );
  }

  res.status(200).json({
    success: true,
    data: tour
  });
});
//@desc   Create Tours
//@route  POST api/v1/tours/
//@access private
exports.createTours = factory.createHandler(Tours);
//@desc   Update Tours
//@route  POST api/v1/tours/:id
//@access private
exports.updateTour = factory.updateHandler(Tours);
//@desc   delete Tours
//@route  POST api/v1/tours/:id
//@access private
exports.deleteTours = factory.deleteHandler(Tours);

//@desc   Get Tours Within a Radius
//@route  Get api/v1/tours/:distance/center/:latlng/unit/:unit
//@access public
exports.toursWithin = catchAsync(async (req, res, next) => {
  const { distance, latlng, unit } = req.params;
  const [lat, lng] = latlng.split(',');

  const radius = unit === 'mi' ? distance / 535 : distance / 838383;

  if (!lat || !lng) {
    return next(
      new AppError(
        'please provide latitude and longitude in this format: lat,lng',
        400
      )
    );
  }

  const tour = await Tours.find({
    startLocation: {
      $geoWithin: { $centerSphere: [[lng, lat], radius] }
    }
  });

  res.status(200).json({
    success: true,
    results: tour.length,
    data: tour
  });
});

//@desc   Get Tours distances
//@route  Get api/v1/tours/distance/:latlng/unit/:unit
//@access public
exports.getTourDistance = catchAsync(async (req, res, next) => {
  const { latlng, unit } = req.params;

  const [lat, lng] = latlng.split(',');

  if (!lat || !lng) {
    return next(
      new AppError(
        'please provide latitude and longitude in this format: lat,lng',
        400
      )
    );
  }

  const multiply = unit === 'mi' ? 0.000621371 : 0.01;

  const tour = await Tours.aggregate([
    {
      $geoNear: {
        near: { type: 'Point', coordinates: [lng * 1, lat * 1] },
        distanceField: 'distances',
        distanceMultiplier: multiply
      }
    },
    {
      $project: {
        distances: 1,
        name: 1
      }
    }
  ]);

  res.status(200).json({
    success: true,
    data: tour
  });
});

//@desc   Get Tours stats
//@route  Get api/v1/tours/tourstats
//@access public
exports.getTourStats = catchAsync(async (req, res, next) => {
  const stat = await Tours.aggregate([
    {
      $match: { ratingsAverage: { $gte: 4.5 } }
    },
    {
      $group: {
        _id: { $toUpper: '$difficulty' },
        average_price: { $avg: '$price' },
        average_rating: { $avg: '$ratingsAverage' },
        num_rating: { $sum: '$ratingsQuantity' },
        min_price: { $min: '$price' },
        max_price: { $max: '$price' },
        total_tours: { $sum: 1 }
      }
    },
    {
      $sort: { average_price: 1 }
    }
  ]);
  res.status(200).json({
    status: true,
    data: stat
  });
});

//@desc   Get Tours Monthly Plan
//@route  Get api/v1/tours/monthly-plan/:year
//@access public
exports.getTourMonthlyPlan = catchAsync(async (req, res, next) => {
  const year = req.params.year * 1;
  const plan = await Tours.aggregate([
    {
      $unwind: '$startDates'
    },
    {
      $match: {
        startDates: {
          $gte: new Date(`${year}-01-01`),
          $lte: new Date(`${year}-12-31`)
        }
      }
    },
    {
      $group: {
        _id: { $month: '$startDates' },
        number_tours: { $sum: 1 },
        name_tour: { $push: '$name' }
      }
    },
    {
      $addFields: {
        month: '$_id'
      }
    },
    {
      $project: { _id: 0 }
    },
    {
      $sort: { number_tours: -1 }
    }
  ]);

  res.status(200).json({
    status: true,
    results: plan.length,
    data: plan
  });
});
