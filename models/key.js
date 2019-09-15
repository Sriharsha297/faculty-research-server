const mongoose = require('mongoose');

const keySchema = new mongoose.Schema({
    key: String,
});

const Key = mongoose.model('Key', keySchema);
module.exports = Key;