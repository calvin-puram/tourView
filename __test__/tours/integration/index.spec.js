/**
 * @jest-environment node
 */
/* eslint-disable no-undef */
const supertest = require('supertest');
const mongoose = require('mongoose');

const Tours = require('../../../models/Tours');
const connectDB = require('../../../config/db');

const app = require('../../../app.js');

const request = () => supertest(app);

const data = {
  name: 'The Forest Hiker',
  duration: 5,
  maxGroupSize: 25,
  difficulty: 'easy',
  ratingsAverage: 4.7,
  ratingsQuantity: 37,
  price: 397,
  summary: 'Breathtaking hike through the Canadian Banff National Park',
  description: 't mollit anim id est laborum.',
  imageCover: 'tour-1-cover.jpg',
  images: ['tour-1-1.jpg', 'tour-1-2.jpg', 'tour-1-3.jpg'],
  startDates: ['2021-04-25,10:00', '2021-07-20,10:00', '2021-10-05,10:00']
};

describe('tours.js', () => {
  beforeEach(async () => {
    await connectDB();
  });

  afterEach(async () => {
    await mongoose.connection.close();
  });

  describe('the all tour', () => {
    it('should return all tours document in the database', async () => {
      const doc = await Tours.countDocuments();

      const res = await request().get('/api/v1/tours');

      expect(res.body.results).toBe(doc);
    });
  });

  describe('single tour', () => {
    it('should return single tours', async () => {
      const res = await request().get(`/api/v1/tours/the-northern-lights`);

      expect(res.body.data).toBeDefined();
      expect(res.body.data.name).toBe('The Northern Lights');
    });

    it('should throw error if slug is does not match', async () => {
      const res = await request().get(`/api/v1/tours/the-northern-light`);

      expect(res.body.msg).toBe(
        'No Resource Found With slug: the-northern-light'
      );
      expect(res.status).toBe(404);
      expect(res.body.success).toBeFalsy();
    });
  });
});
