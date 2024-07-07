
//retrieve the list of all the property types with their count: 
//add searching by name, sorting and pagination to this. 
const Airbnb = require('../models/airbnb');

const getPropertyTypes = async (req, res) => {
    const { page = 1, limit = 10, sort = 'asc', name = '' } = req.query;
    const sortOrder = sort === 'asc' ? 1 : -1;
    const regex = new RegExp(name, 'i'); // case-insensitive search

    try {
        const pipeline = [
            { $match: { name: { $regex: regex } } },
            { $group: { _id: '$property_type', count: { $sum: 1 } } },
            { $sort: { _id: sortOrder } },
            { $skip: (page - 1) * parseInt(limit) },
            { $limit: parseInt(limit) }
        ];

        const propertyTypes = await Airbnb.aggregate(pipeline);

        res.json(propertyTypes);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = { getPropertyTypes };
