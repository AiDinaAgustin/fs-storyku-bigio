const { createChapter, getChapterById, getAllChapters, updateChapter, deleteChapter, getChaptersByStoryId } = require('../services/chapterService');

const createChapterController = async (req, res) => {
    try {
      const storyId = req.params.storyId; 
      const data = {
        ...req.body,
        storyId: storyId 
      };
      const chapter = await createChapter(data);
      res.status(201).json({ message: "Chapter created successfully", chapter });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

const getChapterByIdController = async (req, res) => {
  try {
    const id = req.params.id;
    const chapter = await getChapterById(id);
    if (!chapter) {
      return res.status(404).json({ error: "Chapter not found" });
    }
    res.status(200).json(chapter);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllChaptersController = async (req, res) => {
  try {
    const storyId = req.params.storyId;
    const chapters = await getAllChapters(storyId);
    res.status(200).json(chapters);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateChapterController = async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const chapter = await updateChapter(id, data);
    res.status(200).json({ message: "Chapter updated successfully", chapter });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteChapterController = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await deleteChapter(id);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getChaptersByStoryIdController = async (req, res) => {
    try {
      const storyId = req.params.storyId;
      const chapters = await getChaptersByStoryId(storyId);
      res.status(200).json(chapters);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

module.exports = {
  createChapterController,
  getChapterByIdController,
  getAllChaptersController,
  updateChapterController,
  deleteChapterController,
  getChaptersByStoryIdController
};