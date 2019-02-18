const Boom = require('boom');
const request = require('r2');
const mongoClient = require('@hotelscanner/lib/mongodb');
const asyncRoute = require('@hotelscanner/lib/utils/asyncRoute');

async function create(req, res) {
  const hotelId = req.body.hotelId;
  if (!hotelId) {
    throw Boom.badRequest('Hotel id is required');
  }
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
  tomorrow.setHours(0, 0, 0, 0);

  const from = new Date(req.body.from);
  if (Number.isNaN(from.getTime()) || from.getTime() < today.getTime()) {
    throw Boom.badRequest('From date should be in a correct format');
  }
  const to = new Date(req.body.to);
  if (Number.isNaN(to.getTime()) || to.getTime() < tomorrow.getTime()) {
    throw Boom.badRequest('To date should be in a correct format');
  }

  const response = await request(`${process.env.HOTELS_API_URI}/hotels/${hotelId}`).json;
  if (!response.data) {
    throw Boom.badRequest(`Hotel with id=${hotelId} does not exist`);
  }
  const reservedFrom = from;
  reservedFrom.setHours(0, 0, 0, 0);
  const reservedTo = to;
  reservedTo.setHours(0, 0, 0, 0);

  const booking = {
    hotelId,
    userId: req.user.sub,
    from: reservedFrom,
    to: reservedTo
  }
  const { insertedId } = await mongoClient.db.collection('bookings').insertOne(booking);
  res.json({
    data: {
      id: insertedId
    }
  });
}

module.exports = asyncRoute(create);