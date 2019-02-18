const Boom = require('boom');
const mongoClient = require('@hotelscanner/lib/mongodb');
const asyncRoute = require('@hotelscanner/lib/utils/asyncRoute');

async function get(req, res) {
  const id = req.params.id;
  if (!id) {
    throw Boom.badRequest('Hotel id is required');
  }
  const hotel = await mongoClient.db.collection('hotels').findOne({ _id: mongoClient.createObjectId(id) });
  if (!hotel) {
    throw Boom.notFound(`Hotel with id=${id} is not found`);
  }
  res.json({
    data: {
      ...hotel
    }
  });
}

module.exports = asyncRoute(get);