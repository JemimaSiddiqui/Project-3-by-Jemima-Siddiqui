const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const tutorSchema = new Schema({
    tutorFirst: {
      type: String,
      required: true,
      trim: true,
    },
    tutorLast: {
      type: String,
      required: true,
      trim: true,
    },
    tutorEmail: {
      type: String,
      required: true,
      trim: true,
    },
    tutorAbout: {
      type: String,
      required: 'You need to write something about yourself',
      minlength: 1,
      maxlength: 280,
      trim: true,
    },
    tutorLoc: {
      type: String,
      required: true,
      trim: true,
    },
    tutorCert: {
      type: String,
      required: true,
      trim: true,
    },
    tutorPic: {
      type: String,
      trim: true,
    },
    tutorPh: {
      type: String,
      required: true,
      trim: true,
    },
    tutorAuthor: {
      type: String,
      required: true,
      trim: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (timestamp) => dateFormat(timestamp),
    },
    ratings: [
      {
        ratingText: {
          type: String,
          required: true,
          minlength: 1,
          maxlength: 280,
        },
        ratingAuthor: {
          type: String,
          required: true,
        },
        createdAt: {
          type: Date,
          default: Date.now,
          get: (timestamp) => dateFormat(timestamp),
        },
      },
    ],
  });

const Tutor = model('Tutor', tutorSchema);

module.exports = Tutor;