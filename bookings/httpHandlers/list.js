const mongoClient = require('@hotelscanner/lib/mongodb');
const asyncRoute = require('@hotelscanner/lib/utils/asyncRoute');

const PAGE_SIZE = process.env.QUERY_PAGE_SIZE || 10;

async function list(req, res) {
  const options = { limit: PAGE_SIZE + 1, sort: { from: 1 } };
  const page = parseInt(req.query.page);
  if (!Number.isNaN(page) && page > 1) {
    options.skip = (page - 1) * PAGE_SIZE;
  }
  const cursor = await mongoClient.db.collection('bookings').find({ userId: req.user.sub }, options);
  const collection = await cursor.toArray();
  const data = {
    hasMore: collection.length > PAGE_SIZE,
    collection
  }
  res.json({
    data
  });
}

module.exports = asyncRoute(list);