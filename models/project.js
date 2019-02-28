"use strict";
const mongoose = require('../db');
const Schema = mongoose.Schema;

const projectSchema = new Schema({
  name: {type: String, required: true},
  locs: {type: [Number], required: true}
}, { usePushEach: true });

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;