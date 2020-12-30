const express = require('express');
const app = express();

app.use(express.json({ urlencoded: true }));

const http = require('http');
const server = http.Server(app);

const dotenv = require('dotenv');
dotenv.config({ path: './config/config.env' });

const connectDB = require('./connectDB/connectDB');
connectDB();

const Router = require('./routes/ROUTE');
const { urlencoded } = require('express');
app.use(Router);

server.listen(process.env.PORT, () => {
  console.log(`server running on port ${process.env.PORT} in ${process.env.NODE_ENV} mode`);
});

app.get('/help', (req, res) => {
  res.status(200).json({
    routes: {
      genTokens: { url: '/grnTokens?userId=123' },
      verifyTokens: { ur: '/verifyTokens', body: { userId: 123, accessTokens: 'abc' } },
      genNewTokens: { url: '/genNewTokens', body: { userId: 123, accessToken: 'abc', refreshTokens: 'abc' } },
      deleteTokens: { url: '/deleteTokens', body: { userId: 123, accessToken: 'abc' } }
    },
    response: {
      sucess: [true, 'failed'],
      message: 'message for the response',
      payload: 'message by server',
      accessToken: 'abc',
      refreshToken: 'abc'
    }
  });
});
