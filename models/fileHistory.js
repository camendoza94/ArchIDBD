"use strict";
const mongoose = require('../db');
const Schema = mongoose.Schema;

const fileHistorySchema = new Schema({
    name: {type: String, required: true},
    data: {type: [], required: true}
}, { usePushEach: true });

const File = mongoose.model('File', fileHistorySchema);

module.exports = File;