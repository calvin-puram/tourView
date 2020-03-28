const stripe = require('stripe')('sk_test_ACohO2E7mJ130xVTagwmyu1B00SKDq7feX');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
// const factory = require('./factoryHandler');
const Tours = require('../models/Tours');
const Bookings = require('../models/Bookings');

exports.getCheckoutSessions = catchAsync(async (req, res, next) => {
  const tour = await Tours.findById(req.params.tourId);

  if (!tour) {
    return next(
      new AppError(`no tour found with this id: ${req.params.tourId}`, 400)
    );
  }

  //create checkout session
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    success_url: `https://tourview.herokuapp.com/tour/bookings/${req.params.tourId}/${req.user.id}/${tour.price}`,
    cancel_url: `https://tourview.herokuapp.com/tour/${tour.slug}`,
    customer_email: req.user.email,
    client_reference_id: req.params.tourId,
    line_items: [
      {
        name: tour.name,
        description: tour.summary,
        images: [`https://tourview.herokuapp.com/img/${tour.images[0]}`],
        amount: tour.price * 100,
        currency: 'usd',
        quantity: 1
      }
    ]
  });

  res.status(200).json({
    success: true,
    data: session
  });
});

exports.bookingsCheckout = catchAsync(async (req, res, next) => {
  const { tour, user, price } = req.body;

  if (!tour && !user && !price) {
    next(new AppError('Invalid Credentials', 400));
  }

  await Bookings.create({ tour, user, price });

  res.status(200).json({
    success: true
  });
});

exports.getAllBookings = catchAsync(async (req, res, next) => {
  const bookings = await Bookings.find({ user: req.user.id });
  if (bookings.length === 0) {
    return next(new AppError('user has not booked any tour', 404));
  }
  const toursId = bookings.map(el => el.tour);

  const tours = await Tours.find({ _id: { $in: toursId } });

  res.status(200).json({
    count: tours.length,
    success: true,
    data: tours
  });
});
