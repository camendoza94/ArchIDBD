"use strict";
const mongoose = require('../db');
const Schema = mongoose.Schema;

const issueSchema = new Schema({
    rule: {type: Number, required: true},
    description: {type: String, required: true}
});

const Issue = mongoose.model('Issue', issueSchema);

module.exports = Issue;