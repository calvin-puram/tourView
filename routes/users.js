const express = require('express');

const router = express.Router();

const userController = require('../controller/users');
const auth = require('../controller/auth');

router.post('/signup', auth.signup);
router.post('/login', auth.login);

router.post('/forgotPassword', auth.forgotPassword);
router.patch('/resetPassword', auth.resetPassword);
router.post('/confirmAccount', auth.confirmAccount);

router.use(auth.protect);

router.patch('/resendEmail', auth.resendEmail);
router.patch('/updatePassword', auth.updatePassword);
router.patch(
  '/updateMe',
  userController.userUpdatePhoto,
  userController.updateMe
);
router.delete('/deleteMe', userController.deleteMe);
router.get('/myprofile', userController.myprofile, userController.getOneUser);

router.use(auth.restrictTo('admin'));

router
  .route('/')
  .get(userController.getUsers)
  .post(userController.createUser);

router
  .route('/:id')
  .get(userController.getOneUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
