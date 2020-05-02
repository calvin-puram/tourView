const crypto = require('crypto');
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const Mail = require('@fullstackjs/mail');

const { Schema } = mongoose;

const UserSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: [true, 'a name is required']
  },
  email: {
    type: String,
    lower: true,
    unique: true,
    required: [true, 'email is required'],
    validate: [validator.isEmail, 'Invalid email. Try again']
  },
  photo: {
    type: String,
    default: 'default.jpg'
  },
  password: {
    type: String,
    required: [true, 'password is required'],
    minlength: 8,
    select: false
  },
  passwordConfirm: {
    type: String,
    required: [true, 'please confirm your password'],
    validate: {
      validator: function(val) {
        return val === this.password;
      },
      message: 'password do not match'
    }
  },
  role: {
    type: String,
    enum: ['user', 'lead-guide', 'guide', 'admin'],
    default: 'user'
  },
  active: {
    type: Boolean,
    default: true,
    select: false
  },
  passwordChangeAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
  emailConfirmCode: String,
  emailConfirmAt: Date,
  createdAt: {
    type: Date,
    default: Date.now
  },
  wasNew: Boolean
});

// hash password
UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});

// generate emailConfirmToken
UserSchema.pre('save', function(next) {
  this.wasNew = this.isNew;
  if (!this.isNew) return next();
  const token = crypto.randomBytes(32).toString('hex');
  this.emailConfirmCode = token;
  next();
});

// confirm account
UserSchema.post('save', async function() {
  if (!this.isModified('email') && this.wasNew) {
    await this.resendEmailConfirm();
  }
});

//resend email confirm
UserSchema.methods.resendEmailConfirm = async function() {
  try {
    await new Mail('confirm-account')
      .to(this.email, this.name)
      .subject('confirm your email')
      .data({
        url: `${process.env.BASE_URL}/email/confirm/${this.emailConfirmCode}`,
        name: this.name
      })
      .send();
  } catch (err) {
    console.log(err);
  }
};

//set password change time
UserSchema.pre('save', function(next) {
  if (!this.isModified('password') || this.isNew) return next();
  this.passwordChangeAt = Date.now() - 1000;
  next();
});

//show only active set to true
UserSchema.pre(/^find/, function(next) {
  this.find({ active: true });
  next();
});

// compare password
UserSchema.methods.comparePassword = async (
  candidatePassword,
  userPassword
) => {
  return await bcrypt.compare(candidatePassword, userPassword);
};

//check password
UserSchema.methods.checkpassword = function(jwtTimestamp) {
  if (this.passwordChangeAt) {
    const convertTime = parseInt(this.passwordChangeAt.getTime() / 1000, 10);
    return jwtTimestamp < convertTime;
  }
  return false;
};

//send forgot password token
UserSchema.methods.forgotPasswordToken = async function() {
  const resetToken = crypto.randomBytes(32).toString('hex');

  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  try {
    await new Mail('forgot-password')
      .to(this.email, this.name)
      .subject('password reset token (expires after 10mins)')
      .data({
        url: `${process.env.BASE_URL}/reset/password/${resetToken}`,
        name: this.name
      })
      .send();
  } catch (err) {
    console.log(err);
  }
};

const Users = mongoose.model('Users', UserSchema);
module.exports = Users;
