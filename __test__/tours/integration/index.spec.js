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

  it('should return true', () => {
    expect(true).toBeTruthy();
  });
});
