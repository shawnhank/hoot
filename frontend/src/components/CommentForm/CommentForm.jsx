import { useState, useEffect } from 'react';
// Import the hoot service for API calls (including comment functions)
import * as hootService from '../../services/hootService';

export default function CommentForm({ hootId, setHoot, commentToEdit, onUpdateComment, onCancelEdit }) {
  // State to store the comment form data
  const [commentData, setCommentData] = useState({
    text: '' // Initialize with empty text
  });
  
  // State to handle any error messages
  const [error, setError] = useState('');

  // Add useEffect to populate form when editing a comment
  useEffect(() => {
    // If we're editing a comment, populate the form with its text
    if (commentToEdit) {
      setCommentData({ text: commentToEdit.text });
    }
  }, [commentToEdit]);

  // Handle changes to the form input
  function handleChange(evt) {
    // Update the commentData state with the new value
    // while preserving any other fields that might exist
    setCommentData({ ...commentData, [evt.target.name]: evt.target.value });
  }

  // Handle form submission - updated to handle both new comments and edits
  async function handleSubmit(evt) {
    // Prevent the default form submission behavior
    evt.preventDefault();
    
    try {
      // Check if we're editing an existing comment or creating a new one
      if (commentToEdit) {
        // We're editing - call the update function passed as a prop
        await onUpdateComment(commentToEdit._id, commentData);
      } else {
        // We're creating a new comment - existing code
        const newComment = await hootService.createComment(hootId, commentData);
        
        // Update the parent hoot state with the new comment
        setHoot(prevHoot => {
          // Create a new comments array with all existing comments plus the new one
          const updatedComments = [...prevHoot.comments, newComment];
          
          // Return a new hoot object with all the same properties
          // but with the updated comments array
          return { ...prevHoot, comments: updatedComments };
        });
        
        // Clear the form after successful submission
        setCommentData({ text: '' });
      }
    } catch (err) {
      // If there's an error, set the error message
      setError(commentToEdit ? 'Error updating comment' : 'Error adding comment');
      console.error(err);
    }
  }

  // Render the comment form - updated to handle editing
  return (
    <div className="comment-form">
      <form onSubmit={handleSubmit}>
        {/* Textarea for comment input */}
        <textarea
          name="text"
          value={commentData.text}
          onChange={handleChange}
          placeholder={commentToEdit ? "Edit your comment..." : "Add a comment..."}
          required
        />
        {/* Submit and Cancel buttons */}
        <div className="form-buttons">
          <button type="submit">
            {commentToEdit ? "Update Comment" : "Post Comment"}
          </button>
          {/* Only show cancel button when editing */}
          {commentToEdit && (
            <button type="button" onClick={onCancelEdit}>
              Cancel
            </button>
          )}
        </div>
      </form>
      {/* Display error message if there is one */}
      {error && <p className="error-message">{error}</p>}
    </div>
  );
}