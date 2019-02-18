const mongoClient = require('@hotelscanner/lib/mongodb');
const asyncRoute = require('@hotelscanner/lib/utils/asyncRoute');

const PAGE_SIZE = process.env.QUERY_PAGE_SIZE || 10;

async function search(req, res) {
  const query = {};
  const options = { limit: PAGE_SIZE + 1, sort: { name: 1 } };
  if (req.query.priceRange) {
    const [gte, lte] = req.query.priceRange.split('-').map(e => parseInt(e));
    query.price = {};
    if (!Number.isNaN(gte)) {
      query.price.$gte = gte;
    }
    if (!Number.isNaN(lte)) {
      query.price.$lte = lte;
    }
  }
  if (req.query.name) {
    query.name = req.query.name;
  }
  const page = parseInt(req.query.page);
  if (!Number.isNaN(page) && page > 1) {
    options.skip = (page - 1) * PAGE_SIZE;
  }
  if (req.query.sort === 'price') {
    options.sort = { price: 1 };
  }
  const cursor = await mongoClient.db.collection('hotels').find(query, options);
  const collection = await cursor.toArray();
  const data = {
    hasMore: collection.length > PAGE_SIZE,
    collection
  }
  res.json({
    data
  });
}

module.exports = asyncRoute(search);