const Post = require('../models/Post');
const path = require('path');

// ✅ Get all posts
exports.getAllPosts = async (req, res) => {
  try {
     const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const skip = (page - 1) * limit;

    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate('author', 'name')                    // show post author's name
      .populate('comments.user', 'name');           // show commenter's name
       const totalCount = await Post.countDocuments();

    res.json({ posts, totalCount });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch posts' });
  }
};

// ✅ Create new post with image upload
exports.createPost = async (req, res) => {
  try {
    const { caption } = req.body;
    const file = req.file;

    if (!caption && !file) {
      return res.status(400).json({ message: 'Caption or image is required' });
    }

    // ✅ File type validation
    if (file && !file.mimetype.startsWith('image/')) {
      return res.status(400).json({ message: 'Only image files are allowed' });
    }

    // ✅ Load user from token/localStorage if available
    const user = req.body.userId || null;  // For now fallback to null or add auth later

    const imageUrl = file ? `/uploads/${file.filename}` : '';
    const newPost = new Post({
      caption,
      imageUrl,
      author: user
    });

    const savedPost = await newPost.save();
    const populatedPost = await Post.findById(savedPost._id)
      .populate('author', 'name')
      .populate('comments.user', 'name');

    res.status(201).json(populatedPost);
  } catch (err) {
    console.error('Create Post Error:', err);
    res.status(500).json({ message: 'Failed to create post' });
  }
};

// ✅ Like a post
const mongoose = require('mongoose');

exports.likePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    const userId = req.body.userId;

    if (!userId) {
      return res.status(400).json({ message: 'User ID is required' });
    }

    const userObjectId = new mongoose.Types.ObjectId(userId);

    // ✅ Add if not already liked
    if (!post.likes.some(id => id.equals(userObjectId))) {
      post.likes.push(userObjectId);
      await post.save();
    }

    // ✅ Populate updated post
    const updatedPost = await Post.findById(post._id)
      .populate('author', 'name')
      .populate('comments.user', 'name');

    res.json(updatedPost);
  } catch (err) {
    console.error('Like post error:', err);
    res.status(500).json({ message: 'Failed to like post' });
  }
};


// ✅ Add a comment
// ✅ Add a comment
exports.addComment = async (req, res) => {
  try {
    const { text, userId } = req.body;

    // Step 1: Validate
    if (!text?.trim() || !userId) {
      return res.status(400).json({ message: 'Comment text and userId are required' });
    }

    // Step 2: Verify post
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Step 3: Add comment
    post.comments.push({
      text: text.trim(),
      user: userId
    });

    await post.save();

    // Step 4: Return updated post with populated fields
    const updatedPost = await Post.findById(req.params.id)
      .populate('author', 'name')
      .populate('comments.user', 'name');

    res.status(200).json(updatedPost);
  } catch (err) {
    console.error('Add comment error:', err);
    res.status(500).json({ message: 'Failed to comment' });
  }
};

exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.json({ message: 'Post deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete post' });
  }
};

exports.deleteComment = async (req, res) => {
  try {
    const { postId, commentId } = req.params;

    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    // Remove comment by ID
    post.comments = post.comments.filter(
      (comment) => comment._id.toString() !== commentId
    );

    await post.save();

    const updatedPost = await Post.findById(postId)
      .populate('author', 'name')
      .populate('comments.user', 'name');

    res.json(updatedPost);
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete comment' });
  }
};