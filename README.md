jwtAuthentication##

url:-https://jwtauthentication.herokuapp.com

help url:- https://jwtauthentication.herokuapp.com/help

Routes:\
 Method     Route                                    req.body                              response\
 GET        /getTokens?userId=${mongoDb object Id}   null                                  {accessToken, refreshToken}\
 POST       /verifyTokens                            {userId, accessToken}                 {sucess:true/failed, message:'jwt verifies/err', payload}\
 DELETE     /deleteTokens                            {userId, accessToken}                 {sucess:true/failed, message:'token deleted/err', payload}\
 PUT        /genNewTokens                            {userId, accessToken, RefreshToken}   {sucess:true/failed, message:'generated new tokens/err', payload}

instructions:-\
 -The api only works for unique mongoDB.Schema.Types.ObjectID.\
 -request for new tokens will fail if old access tokens are still valid or refresh token is invalid or the access token sent is not the last one which was issued.\
 -request for verification and deletion will fail if proper userid and access tokens are not sent in req.body\
 -send request in followinf fashion:-\
       --generate new tokens when user logs in\
       --verify tokens for every request\
       --if verification fails generate new tokens and verify again\
       --delete tokens when user logs out
