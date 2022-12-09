const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const chargerSchema = new Schema({
  chargerOwner: { //username
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  chargerId: {
    type: String,
    required: true,
    trim: true,
  },
  portId: {
    type: String,
    required: true,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  },
  // comments: [
  //   {
  //     commentText: {
  //       type: String,
  //       required: true,
  //       minlength: 1,
  //       maxlength: 280,
  //     },
  //     commentAuthor: {
  //       type: String,
  //       required: true,
  //     },
  //     createdAt: {
  //       type: Date,
  //       default: Date.now,
  //       get: (timestamp) => dateFormat(timestamp),
  //     },
  //   },
  // ],
});

const Charger = model('Charger', chargerSchema);

module.exports = Charger;
