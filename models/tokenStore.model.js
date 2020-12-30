const mongoose = require('mongoose');

var tokenStoreSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        unique: true
    },
    accessTokenSecret: {
        type: String,
        required: true
    },
    refreshTokenSecret: {
        type: String,
        required: true
    },
    currentAccessToken: {
        type: String,
        required: true
    }
});

var tokenStoreModel = mongoose.model('tokenStore', tokenStoreSchema);

module.exports = tokenStoreModel;