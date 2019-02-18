const express = require('express');
const cors = require('cors');
const compression = require('compression');
const bodyParser = require('body-parser');
const mongoClient = require('@hotelscanner/lib/mongodb');
const auth = require('@hotelscanner/lib/middlewares/auth');
const handleErrors = require('@hotelscanner/lib/middlewares/handleErrors');
const list = require('./httpHandlers/list');
const create = require('./httpHandlers/create');
const remove = require('./httpHandlers/remove');

const app = express();
app.use(cors());
app.use(compression());
app.use(bodyParser.json());

app.use(auth);

app.get('/bookings', list);
app.post('/bookings', create);
app.delete('/bookings/:id', remove);

app.use((req, res) => {
  res.status(404).json({
    error: {
      code: 404,
      message: 'Not found'
    }
  })
});

app.use(handleErrors);

const port = process.env.PORT || 3003;

mongoClient
  .connect()
  .then(() => mongoClient.db.collection('bookings').createIndex({ userId: 1, from: 1 }))
  .then(() => app.listen(port, () => {
    console.log(`bookings service listening on ${port}`)
  }))
  .catch(err => {
    console.error(err);
    process.exit(1);
  });