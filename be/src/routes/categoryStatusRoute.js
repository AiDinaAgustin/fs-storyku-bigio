const express = require('express');
const router = express.Router();
const { getCategoriesController, getStatusesController } = require('../controllers/categoryStatusController');

router.get('/categories', getCategoriesController);
router.get('/statuses', getStatusesController);

module.exports = router;