const path = require('path');
const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cors = require('cors');

const toursRoutes = require('./routes/tours');
const usersRoutes = require('./routes/users');
const globalError = require('./controller/globalError');
const reviewsRoute = require('./routes/reviews');
const bookingsRoute = require('./routes/bookings');
const favoriteRoute = require('./routes/Favorite');

const app = express();

//helmet
app.use(helmet());
app.use(cors());

app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, './public')));

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('tiny'));
}

app.use(hpp());
app.use(mongoSanitize());
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});

//rate limit
app.use('/api/', limiter);
app.use(xss());

app.use('/api/v1/tours', toursRoutes);
app.use('/api/v1/users', usersRoutes);
app.use('/api/v1/reviews', reviewsRoute);
app.use('/api/v1/bookings', bookingsRoute);
app.use('/api/v1/favorite', favoriteRoute);
app.use(globalError);

if (process.env.NODE_ENV === 'production') {
  //set static folder
  app.use(express.static('./public'));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
  });
}

module.exports = app;
