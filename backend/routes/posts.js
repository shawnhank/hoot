const express = require('express');
const router = express.Router();
const postsCtrl = require('../controllers/posts');

// All paths start with '/api/posts'

// GET /api/posts (INDEX action)
router.get('/', postsCtrl.index);

module.exports = router;