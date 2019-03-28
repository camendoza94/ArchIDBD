"use strict";
const mongoose = require('../db');
const Schema = mongoose.Schema;

const keySchema = new Schema({
  name: {type: String, required: true},
  key: {type: String, required: true}
});

const Key = mongoose.model('Key', keySchema);

module.exports = Key;