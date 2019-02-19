const data = require('./hotels.json');
const mongoClient = require('../lib/mongodb');

(async function() {
  try {
    await mongoClient.connect();
    await mongoClient.db.collection('hotels').insertMany(data);
    console.log('ok');
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();
