const express = require('express');

const router = express.Router();

const favoriteController = require('../controller/Favorite');
const auth = require('../controller/auth');

router.route('/:id').get(auth.protect, favoriteController.createFavorite);

module.exports = router;
