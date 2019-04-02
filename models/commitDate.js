"use strict";
const mongoose = require('../db');
const Schema = mongoose.Schema;

const commitDateSchema = new Schema({
    name: {type: String, required: true},
    dates: {type: [], required: true}
});

const CommitDate = mongoose.model('CommitDate', commitDateSchema);

module.exports = CommitDate;