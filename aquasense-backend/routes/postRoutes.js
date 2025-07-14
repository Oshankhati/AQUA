const express = require('express');
const multer = require('multer');
const path = require('path');
const postController = require('../controllers/postController');

const router = express.Router();

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Folder must exist
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});
const upload = multer({ storage });

// Routes
router.get('/', postController.getAllPosts);
router.post('/', upload.single('image'), postController.createPost);
router.post('/:id/like', postController.likePost);
router.post('/:id/comment', postController.addComment);

module.exports = router;

router.delete('/:id', postController.deletePost);
router.delete('/:postId/comment/:commentId', postController.deleteComment);