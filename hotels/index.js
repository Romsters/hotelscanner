const express = require('express');
const cors = require('cors');
const compression = require('compression');
const bodyParser = require('body-parser');
const handleErrors = require('@hotelscanner/lib/middlewares/handleErrors');
const mongoClient = require('@hotelscanner/lib/mongodb');
const search = require('./httpHandlers/search');
const get = require('./httpHandlers/get');

const app = express();
app.use(cors());
app.use(compression());
app.use(bodyParser.json());

app.get('/hotels', search);
app.get('/hotels/:id', get);

app.use((req, res) => {
  res.status(404).json({
    error: {
      code: 404,
      message: 'Not found'
    }
  })
});

app.use(handleErrors);

const port = process.env.PORT || 3002;

mongoClient
  .connect()
  .then(() => Promise.all([
    mongoClient.db.collection('hotels').createIndex({ name: 1, price: 1 }),
    mongoClient.db.collection('hotels').createIndex({ price: 1, name: 1 })
  ]))
  .then(() => app.listen(port, () => {
    console.log(`hotels service listening on ${port}`)
  }))
  .catch(err => {
    console.error(err);
    process.exit(1);
  });