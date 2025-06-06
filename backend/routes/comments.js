// Import Express to create a router
const express = require('express');

// Create a router with mergeParams option. Important to access parent route params
// mergeParams: true allows this router to access parameters from the parent router
// (specifically hootId)
const router = express.Router({ mergeParams: true });

// Import the comments controller
const commentsCtrl = require('../controllers/comments');

// Import the middleware to ensure users are logged in. Protects routes
const ensureLoggedIn = require('../middleware/ensureLoggedIn');

// All paths start with '/api/hoots/:hootId/comments'

// Protect all routes
router.use(ensureLoggedIn);

// POST /api/hoots/:hootId/comments (CREATE action)
// creates new comment on a specific hoot
router.post('/', commentsCtrl.create);

// PUT /api/hoots/:hootId/comments/:commentId (UPDATE action)
// updates a specific comment on a hoot
router.put('/:commentId', commentsCtrl.update);

// DELETE /api/hoots/:hootId/comments/:commentId (DELETE action)
// deletes a specific comment from a hoot
router.delete('/:commentId', commentsCtrl.delete);

// Export the router for use in server.js
module.exports = router;