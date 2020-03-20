const express = require('express');

const router = express.Router();

const favoriteController = require('../controller/Favorite');
const auth = require('../controller/auth');

router.route('/:id').post(auth.protect, favoriteController.createFavorite);

module.exports = router;
