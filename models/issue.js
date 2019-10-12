"use strict";
const mongoose = require('../db');
const Schema = mongoose.Schema;

const issueSchema = new Schema({
    id: {type: String, required: true, unique: true},
    rule: {type: Number, required: true},
    description: {type: String, required: true}
});

const Issue = mongoose.model('Issue', issueSchema);

module.exports = Issue;