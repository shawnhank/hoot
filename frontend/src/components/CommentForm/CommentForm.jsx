import { useState } from 'react';
// Import the hoot service for API calls (including comment functions)
import * as hootService from '../../services/hootService';

export default function CommentForm({ hootId, setHoot }) {
  // State to store the comment form data
  const [commentData, setCommentData] = useState({
    text: '' // Initialize with empty text
  });
  
  // State to handle any error messages
  const [error, setError] = useState('');

  // Handle changes to the form input
  function handleChange(evt) {
    // Update the commentData state with the new value
    // while preserving any other fields that might exist
    setCommentData({ ...commentData, [evt.target.name]: evt.target.value });
  }

  // Handle form submission
  async function handleSubmit(evt) {
    // Prevent the default form submission behavior
    evt.preventDefault();
    
    try {
      // Call the API to create a new comment using hootService
      // This returns the newly created comment from the server
      const newComment = await hootService.createComment(hootId, commentData);
      
      // Update the parent hoot state with the new comment
      // We use a function form of setState to safely update based on previous state
      setHoot(prevHoot => {
        // Create a new comments array with all existing comments plus the new one
        const updatedComments = [...prevHoot.comments, newComment];
        
        // Return a new hoot object with all the same properties
        // but with the updated comments array
        return { ...prevHoot, comments: updatedComments };
      });
      
      // Clear the form after successful submission
      setCommentData({ text: '' });
    } catch (err) {
      // If there's an error, set the error message
      setError('Error adding comment');
      console.error(err);
    }
  }

  // Render the comment form
  return (
    <div className="comment-form">
      <form onSubmit={handleSubmit}>
        {/* Textarea for comment input */}
        <textarea
          name="text"
          value={commentData.text}
          onChange={handleChange}
          placeholder="Add a comment..."
          required
        />
        {/* Submit button */}
        <button type="submit">Post Comment</button>
      </form>
      {/* Display error message if there is one */}
      {error && <p className="error-message">{error}</p>}
    </div>
  );
}