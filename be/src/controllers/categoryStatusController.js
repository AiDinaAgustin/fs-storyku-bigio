const { getCategories, getStatuses } = require('../services/categoryStatusService');

const getCategoriesController = async (req, res) => {
  try {
    const categories = await getCategories();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getStatusesController = async (req, res) => {
  try {
    const statuses = await getStatuses();
    res.status(200).json(statuses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getCategoriesController,
  getStatusesController,
};