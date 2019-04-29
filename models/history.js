"use strict";
const mongoose = require('../db');
const Schema = mongoose.Schema;

const historySchema = new Schema({
    name: {type: String, required: true},
    data: {type: [], required: true}
}, { usePushEach: true });

const History = mongoose.model('History', historySchema);

module.exports = History;