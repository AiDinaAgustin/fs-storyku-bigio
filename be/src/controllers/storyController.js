const { createStory, getStoryById, getAllStories, updateStory, deleteStory } = require('../services/storyService');

const createStoryController = async (req, res) => {
  try {
    const data = req.body;
    const file = req.file;
    const story = await createStory(data, file);
    res.status(201).json({ message: "Story created successfully", story });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getStoryByIdController = async (req, res) => {
  try {
    const id = req.params.id;
    const story = await getStoryById(id);
    if (!story) {
      return res.status(404).json({ error: "Story not found" });
    }
    res.status(200).json(story);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllStoriesController = async (req, res) => {
  try {
    const filters = {
      kategori: req.query.kategori,
      status: req.query.status,
    };
    const stories = await getAllStories(filters);
    res.status(200).json(stories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateStoryController = async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const file = req.file;
    const story = await updateStory(id, data, file);
    res.status(200).json({ message: "Story updated successfully", story });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteStoryController = async (req, res) => {
  try {
    const id = req.params.id;
    const storyId = parseInt(id);
    if (isNaN(storyId)) {
      return res.status(400).json({ error: 'Invalid story ID' });
    }

    const result = await deleteStory(storyId);
    res.status(200).json(result);
  } catch (error) {
    console.error('Error deleting story:', error);
    res.status(500).json({ error: error.message });
  }
};


module.exports = {
  createStoryController,
  getStoryByIdController,
  getAllStoriesController,
  updateStoryController,
  deleteStoryController,
};