// Import the Hoot model since comments are embedded in Hoot documents
const Hoot = require('../models/hoot');

// Export the controller functions
module.exports = {
  create,
  update,
  delete: deleteComment  // Using a different name for the export because 'delete' is a reserved word
};

// Creates a new comment on a specific hoot
async function create(req, res) {
  try {
    // Find parent hoot using the ID from the URL parameter
    const hoot = await Hoot.findById(req.params.hootId);
    
    // If hoot doesn't exist, return a 404 error
    if (!hoot) return res.status(404).json({ message: 'Hoot not found' });
    
    // use ensureLoggedIn middleware to set req.user and logged-in
    // user's ID as the author of the comment
    req.body.author = req.user._id;
    
    // Use the commentSchema embedded in the hootSchema in models/hoot.js
    // to add the comment to the hoot's comments array
    hoot.comments.push(req.body);
    
    // Save the updated hoot with the new comment
    await hoot.save();
    
    // Get the newly created comment (the last one in the array)
    const newComment = hoot.comments[hoot.comments.length - 1];
    
    // Return the new comment with a 201 (Created) status
    res.status(201).json(newComment);
  } catch (err) {
    // Log the error for debugging
    console.log(err);
    // If error, return a 400 error with a message
    res.status(400).json({ message: 'Failed to create comment' });
  }
};

// Updates a specific comment on a hoot
async function update(req, res) {
  try {
    // Find parent hoot using the ID from the URL parameter
    const hoot = await Hoot.findById(req.params.hootId);
    
    // If hoot doesn't exist, return a 404 error
    if (!hoot) return res.status(404).json({ message: 'Hoot not found' });
    
    // Find the specific comment using the Mongoose id() method for subdocuments
    const comment = hoot.comments.id(req.params.commentId);
    
    // If comment doesn't exist, return a 404 error
    if (!comment) return res.status(404).json({ message: 'Comment not found' });
    
    // Check if the logged-in user is the author of the comment
    if (!comment.author.equals(req.user._id)) {
      return res.status(403).json({ message: "Not authorized to update this comment" });
    }
    
    // Update the comment text
    comment.text = req.body.text;
    
    // Save the updated hoot with the modified comment
    await hoot.save();
    
    // Return the updated comment
    res.status(200).json(comment);
  } catch (err) {
    // Log the error for debugging
    console.log(err);
    // If error, return a 400 error with a message
    res.status(400).json({ message: 'Failed to update comment' });
  }
};


// Deletes a specific comment from a hoot
async function deleteComment(req, res) {
  try {
    // Find parent hoot using the ID from the URL parameter
    const hoot = await Hoot.findById(req.params.hootId);
    
    // If hoot doesn't exist, return a 404 error
    if (!hoot) return res.status(404).json({ message: 'Hoot not found' });
    
    // Find the specific comment using the Mongoose id() method for subdocuments
    // returns the subdocument/comment with the matching ID
    const comment = hoot.comments.id(req.params.commentId);
    
    // If comment doesn't exist, return a 404 error
    if (!comment) return res.status(404).json({ message: 'Comment not found' });
    
    // Check if the logged-in user is the author of the comment
    // to prevent users from deleting other users' comments
    if (!comment.author.equals(req.user._id)) {
      return res.status(403).json({ message: "Comment Owner Misatch. Cannot delete this comment" });
    }
    
    // Use Mongoose remove() method is deprecated. Use pull()
    // to remove subdocuments (comments)from the comments array
    hoot.comments.pull(comment._id);
    
    // Save the updated hoot with the comment removed
    await hoot.save();
    
    // Return a success message
    res.status(200).json({ message: 'Comment deleted successfully' });
  } catch (err) {
    // Log the error for debugging
    console.log(err);
    // If error, return a 400 error with a message
    res.status(400).json({ message: 'Failed to delete comment' });
  }
};
