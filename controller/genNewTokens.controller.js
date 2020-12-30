const tokenStore = require('../models/tokenStore.model');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

// @desc     if access tokens get expired use this
// @access   Private need least recently used access token
// @payload  {userId,accessToken,refreshToken}
// @method   Put

async function genNewTokens(req, res, next) {
    let entry = await tokenStore.findOne({ userId: req.body.userId });
    if (req.body.accessToken === entry.currentAccessToken) {
        //ie token sent in body is the last token issued

        //verifying access token to check if it is still valid
        jwt.verify(req.body.accessToken, entry.accessTokenSecret, (Err, Payload) => {

            if (Err) {
                //ie the access token issued last is not valid

                //now checking refresh tokens if they are valid
                jwt.verify(req.body.refreshToken, entry.refreshTokenSecret, async (err, payload) => {

                    if (err) {
                        res.status(400).json({
                            sucess: 'failed',
                            message: `refresh token couldn't be verified for userId ${req.body.userId}`,
                            payload: err
                        });
                    }
                    else {
                        //generating new AccesstokenSecret and AccessToken
                        let accessTokenSecret = crypto.randomBytes(64).toString('hex');
                        let accessToken = jwt.sign({ userId: req.body.userId }, accessTokenSecret, { expiresIn: process.env.TOKEN_DURATION });
                        try {
                            let result = await tokenStore.updateOne({ userId: req.body.userId }, {
                                $set: {
                                    accessTokenSecret: accessTokenSecret,
                                    currentAccessToken: accessToken
                                }
                            });
                            res.status(201).json({
                                sucess: true,
                                message: `generated new tokens for userid ${req.body.userid}`,
                                accessToken,
                                refreshToken: req.body.refreshToken
                            });
                        }
                        catch (e) {
                            res.status(400).json({
                                sucess: 'failed',
                                message: `generation of new Tokens failed for id ${req.body.userId}`,
                                payload: e
                            });
                        }
                    }
                });
            }
            else {
                //ie the accessToken issued last is still valid
                res.status(400).json({
                    sucess: 'failed',
                    message: `access Token issued last for userId ${req.body.userId} is still valid`
                });
            }
        });
    }
    else {
        res.status(400).json({
            sucess: 'failed',
            message: `${req.body.accessToken} isin't the last AccessToken issued for userId ${req.body.userId}`
        });
    }


}

module.exports = genNewTokens;