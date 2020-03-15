const stripe = require('stripe')('sk_test_ACohO2E7mJ130xVTagwmyu1B00SKDq7feX');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
// const factory = require('./factoryHandler');
const Tours = require('../models/Tours');

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
    success_url: `http://localhost:8080/`,
    cancel_url: `http://localhost:8080/tour/${tour.slug}`,
    customer_email: req.user.email,
    client_reference_id: req.params.tourId,
    line_items: [
      {
        name: tour.name,
        description: tour.summary,
        images: [
          'https://images.unsplash.com/photo-1542359649-31e03cd4d909?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=667&q=80'
        ],
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
