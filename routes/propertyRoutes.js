// routes/propertyRoutes.js
const express = require('express');
const { getPropertyTypes } = require('../controllers/propertyController');

const router = express.Router();

router.get('/property-types', getPropertyTypes);

module.exports = router;
