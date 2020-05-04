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

describe('tours.js', () => {
  beforeEach(async () => {
    await connectDB();
  });

  afterEach(async () => {
    await mongoose.connection.close();
  });

  it('should return all tours document in the database', async () => {
    const doc = await Tours.countDocuments();

    const res = await request().get('/api/v1/tours');

    expect(res.body.results).toBe(doc);
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
