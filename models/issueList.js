"use strict";
const mongoose = require('../db');
const Schema = mongoose.Schema;

const issueListSchema = new Schema({
  name: {type: String, required: true},
  data: {type: [], required: true}
});

const IssueList = mongoose.model('IssueList', issueListSchema);

module.exports = IssueList;