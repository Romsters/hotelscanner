const express = require('express');
const cors = require('cors');
const compression = require('compression');
const bodyParser = require('body-parser');
const mongoClient = require('@hotelscanner/lib/mongodb');
const auth = require('@hotelscanner/lib/middlewares/auth');
const handleErrors = require('@hotelscanner/lib/middlewares/handleErrors');
const loginHandler = require('./httpHandlers/login');
const registerHandler = require('./httpHandlers/register');
const userInfoHandler = require('./httpHandlers/userInfo');

const app = express();
app.use(cors());
app.use(compression());
app.use(bodyParser.json());

app.post('/auth/register', registerHandler);
app.post('/auth/login', loginHandler);
app.get('/auth/userinfo', auth, userInfoHandler);

app.use((req, res) => {
  res.status(404).json({
    error: {
      code: 404,
      message: 'Not found'
    }
  })
});

app.use(handleErrors);

const port = process.env.PORT || 3001;

mongoClient
  .connect()
  .then(() => mongoClient.db.collection('users').createIndex({ email: 1 }))
  .then(() => app.listen(port, () => {
    console.log(`auth service listening on ${port}`)
  }))
  .catch(err => {
    console.error(err);
    process.exit(1);
  });