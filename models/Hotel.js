// models/Task.js

import mongoose from 'mongoose';

const HotelSchema = new mongoose.Schema({
  destination: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  fromDate: {
    type: Number,
    required: true,
  },
  bed: {
    type: Number,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  toDate: {
    type: Number,
    required: true, 
  },
  noOfTravellers: {
    type: Number,
    required: true, 
  },
  createdAt: { type: Date, default: Date.now }, // 
});

export default mongoose.models.Task || mongoose.model('Hotel', HotelSchema);
