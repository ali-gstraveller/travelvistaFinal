import connectMongo from '../../lib/db';
import Hotel from '../../models/Hotel';

export default async function handler(req, res) {
  await connectMongo();

  const { destination, noOfTravellers, startDate, endDate, minPrice, maxPrice } = req.query;

  // Build the MongoDB query object
  const searchCriteria = {};

  if (destination) {
    searchCriteria.destination = {$regex: destination, $options: 'i' };
  }

  if (noOfTravellers) {
    searchCriteria.noOfTravellers = {$gte: Number(noOfTravellers)} 
  }
  
  if (startDate || endDate) {
    searchCriteria.createdAt = {};
    if (startDate) {
      searchCriteria.createdAt.$gte = new Date(startDate); // Start date
    }
    if (endDate) {
      searchCriteria.createdAt.$lte = new Date(endDate); // End date
    }
  }

  if (minPrice) {
    searchCriteria.price = { ...searchCriteria.price, $gte: Number(minPrice) };
  }

  if (maxPrice) {
    searchCriteria.price = { ...searchCriteria.price, $lte: Number(maxPrice) };
  }
  
  try {
    const items = await Hotel.find(searchCriteria);
    res.status(200).json({ success: true, data: items });
  } 
  catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching data' });
  }
}