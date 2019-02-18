const Boom = require('boom');
const mongoClient = require('@hotelscanner/lib/mongodb');
const asyncRoute = require('@hotelscanner/lib/utils/asyncRoute');

async function remove(req, res) {
  const id = req.params.id;
  if (!id) {
    throw Boom.badRequest('Booking id is required');
  }

  const booking = await mongoClient.db.collection('bookings').findOne({ _id: mongoClient.createObjectId(id) });
  if (!booking || booking.userId !== req.user.sub) {
    throw Boom.forbidden(`No booking with id=${id} found for the user`);
  }
  await mongoClient.db.collection('bookings').deleteOne({ _id: mongoClient.createObjectId(id) });
  res.json({
    data: {
      success: true
    }
  });
}

module.exports = asyncRoute(remove);