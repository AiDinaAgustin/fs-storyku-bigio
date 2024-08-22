const express = require('express');
const multer = require('multer');
const router = express.Router();
const { 
  createStoryController, 
  getStoryByIdController, 
  getAllStoriesController, 
  updateStoryController, 
  deleteStoryController 
} = require('../controllers/storyController');

const upload = multer({ dest: 'uploads/' });

router.get('/stories', getAllStoriesController);
router.get('/stories/:id', getStoryByIdController);
router.post('/stories', upload.single('sampul'), createStoryController);
router.put('/stories/:id', upload.single('sampul'), updateStoryController);
router.delete('/stories/:id', deleteStoryController);

module.exports = router;