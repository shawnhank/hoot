const Post = require('../models/post');

module.exports = {
  index,
};

async function index(req, res) {
  try {
    const posts = await Post.find({});
    // Below would return all posts for just the logged in user
    // const posts = await Post.find({author: req.user._id});
    res.json(posts);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Failed to fetch posts' });
  }
}

