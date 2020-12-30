const tokenStore = require('../models/tokenStore.model');
const jwt = require('jsonwebtoken');

// @desc    deleting token when user logs out
// @method  delete
// @url     /deleteToken
// @access  Private
// @payload {userId,accessToken}

async function deleteToken(req, res, next) {
    let entry = await tokenStore.findOne({ userId: req.body.userId });
    jwt.verify(req.body.accessToken, entry.accessTokenSecret, async (err, payload) => {
        if (err) {
            res.status(409).json({
                sucess: 'failed',
                message: `deletion of tokens for user id ${req.body.userId} failed`,
                payload: err
            });
        }
        else {
            try {
                let result = await tokenStore.deleteOne({ userId: req.body.userId });
                res.status(202).json({
                    sucess: true,
                    message: `deletion of tokens for user id ${req.body.userId} completed`,
                    payload: result
                });
            }
            catch (e) {
                res.status(409).json({
                    sucess: 'failed',
                    message: `deletion of tokens for user id ${req.body.userId} failed due to some error`,
                    payload: e
                });
            }
        }
    });
}

module.exports = deleteToken;
