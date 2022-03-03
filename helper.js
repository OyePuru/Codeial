const mongoose = require('mongoose');

module.exports.toObjectId = (id) => mongoose.Types.ObjectId(id);
