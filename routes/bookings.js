const express = require('express');

const router = express.Router();

const bookingsController = require('../controller/bookings');
const auth = require('../controller/auth');

router
  .route('/checkout-session/:tourId')
  .get(auth.protect, bookingsController.getCheckoutSessions);

module.exports = router;
