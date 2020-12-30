const genTokens = require('../controller/genTokens.controller');
const verifyTokens = require('../controller/varifyToken.controller');
const deleteTokens = require('../controller/deleteTokens.Controller');
const genNewTokens = require('../controller/genNewTokens.controller');

const Router = require('express').Router();

Router
    .route('/genTokens')
    .get(genTokens);

Router
    .route('/verifyTokens')
    .post(verifyTokens);

Router
    .route('/deleteTokens')
    .delete(deleteTokens);

Router
    .route('/genNewTokens')
    .put(genNewTokens);

module.exports = Router    
