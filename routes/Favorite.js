const express = require('express');

const router = express.Router();

const favoriteController = require('../controller/Favorite');
const auth = require('../controller/auth');

router.use(auth.protect);

router.route('/').get(favoriteController.getFavorite);
router
  .route('/:id')
  .post(favoriteController.createFavorite)
  .get(favoriteController.getUserFavorite);

module.exports = router;
