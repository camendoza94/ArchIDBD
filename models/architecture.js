"use strict";
const mongoose = require('../db');
const Schema = mongoose.Schema;

const architectureSchema = new Schema({
    name: {type: String, required: true},
    children: {type: [], required: true}
});

const Architecture = mongoose.model('Architecture', architectureSchema);

module.exports = Architecture;