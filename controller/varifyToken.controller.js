const tokenStore = require('../models/tokenStore.model');
const jwt = require('jsonwebtoken');

// @desc    varifying jwt tokens ,access token and userId needed
// @access  Private
// @url     /varifyToken
// @payload {accessToken,userId}

async function varifyToken(req, res, next) {
    try {
        let result = await tokenStore.findOne({ userId: req.body.userId });
        jwt.verify(
            req.body.accessToken,
            result.accessTokenSecret,
            (err, payload) => {
                if (err) {
                    res.ststus(400).json({
                        sucess: 'failed',
                        message: `jwt for id ${req.body.userId} not varified as it is invalid or expired`,
                        payload: err
                    });
                }
                else {
                    res.status(200).json({
                        sucess: true,
                        message: 'jwt varified',
                        payload
                    });
                }
            }
        )
    }
    catch (e) {
        res.status(400).json({
            sucess: 'failed',
            message:  `jwt for id ${req.body.userId} not varified as it is invalid or expired`,
            payload:e
        });
    }
}

module.exports = varifyToken;