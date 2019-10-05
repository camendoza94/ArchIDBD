"use strict";
const mongoose = require('../db');
const Schema = mongoose.Schema;

const categorizationSchema = new Schema({
    name: {type: String, required: true},
    decisions: {type: [], required: true}
});

const Categorization = mongoose.model('Categorization', categorizationSchema);

module.exports = Categorization;