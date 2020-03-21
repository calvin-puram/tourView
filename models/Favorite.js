const mongoose = require('mongoose');

const FavoriteSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
    required: true
  },
  tour: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tours',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// FavoriteSchema.pre(/^find/, function(next) {
//   this.populate('user').populate('tour');
//   next();
// });

module.exports = mongoose.model('Favorite', FavoriteSchema);
