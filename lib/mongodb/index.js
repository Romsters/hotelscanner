const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

module.exports = {
  async connect() {
    const dbName = process.env.DBNAME;
    this._client = await MongoClient.connect(`mongodb://${process.env.DBHOST || process.env.IP || '127.0.0.1'}`, {
      connectTimeoutMS: process.env.DBCONNECTIONTIMEOUT || 60000,
      socketTimeoutMS: process.env.DBSOCKETTIMEOUT || 300000,
      useNewUrlParser: true
    })
    this.db = this._client.db(dbName);
  },
  close() {
    if (!this._client) {
      return;
    }
    this._client.close();
  },
  createObjectId(id) {
    return mongodb.ObjectID(id);
  }
};
