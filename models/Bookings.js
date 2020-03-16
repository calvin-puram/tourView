const mongoose = require('mongoose');

const BookingsSchema = new mongoose.Schema({
  tour: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tours',
    required: [true, 'a tour is required']
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
    required: [true, 'a user is required']
  },
  price: {
    type: Number,
    required: [true, 'a price is required']
  },
  paid: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Bookings', BookingsSchema);
