const express = require('express');
const router = express.Router();
const { 
  createChapterController, 
  getChapterByIdController, 
  getAllChaptersController, 
  updateChapterController, 
  deleteChapterController,
  getChaptersByStoryIdController
} = require('../controllers/chapterController');

router.post('/stories/:storyId/chapters', createChapterController);
router.get('/stories/:storyId/chapters', getAllChaptersController);
router.get('/chapters/:id', getChapterByIdController);
router.put('/stories/:storyId/chapters/:id', updateChapterController);
router.delete('/stories/:storyId/chapters/:id', deleteChapterController);
router.get('/stories/:storyId/chapters', getChaptersByStoryIdController); 

module.exports = router;