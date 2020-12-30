const tokenStore = require('../models/tokenStore.model');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

// @desc    generating new token for creating a new document in tokenstore
// @access  public 
// @url     /genAccessToken?userId=123
// @method  POST

async function genNewTokens(req, res, next) {
    try {
        let accessTokenSecret = crypto.randomBytes(64).toString('hex');
        let refreshTokenSecret = crypto.randomBytes(64).toString('hex');

        //generating access and refresh token giving req.query as payload
        let accessToken = jwt.sign(req.query, accessTokenSecret, { expiresIn: process.env.TOKEN_DURATION });
        let refreshToken = jwt.sign(req.query, refreshTokenSecret);

        const result = await tokenStore.create({
            userId: req.query.userId,
            accessTokenSecret,
            refreshTokenSecret,
            currentAccessToken: accessToken
        });

        res.status(201).json({
            sucess: true,
            message: `creating tokens for ${req.query.userId} sucseeded `,
            accessToken,
            refreshToken
        });

    }
    catch (e) {

        res.status(400).json({
            sucess: 'failed',
            message: `creating tokens for ${req.query.userId} failed`,
            error: e
        });

    }
}

module.exports = genNewTokens;