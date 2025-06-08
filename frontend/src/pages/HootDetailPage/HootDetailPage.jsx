import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import * as hootService from '../../services/hootService';
import { getUser } from '../../services/authService';
import CommentForm from '../../components/CommentForm/CommentForm';
import './HootDetailPage.css';

export default function HootDetailPage() {
  console.log('HootDetailPage rendering');
  const [hoot, setHoot] = useState(null);
  const [editingComment, setEditingComment] = useState(null);
  const params = useParams();
  console.log('URL params:', params);
  const navigate = useNavigate();
  const { hootId } = params;
  console.log('Extracted hootId:', hootId);

  useEffect(() => {
    console.log('useEffect running with hootId:', hootId);
    
    async function fetchHoot() {
      console.log('fetchHoot function called');
      try {
        console.log('About to call hootService.show with hootId:', hootId);
        const hootData = await hootService.show(hootId);
        console.log('Received hoot data:', hootData);
        setHoot(hootData);
      } catch (error) {
        console.error('Error fetching hoot:', error);
      }
    }
    
    fetchHoot();
  }, [hootId]);

  async function handleDeleteHoot() {
    try {
      await hootService.deleteHoot(hootId);
      navigate('/hoots');
    } catch (error) {
      console.error('Error deleting hoot:', error);
    }
  }
  
  async function handleDeleteComment(commentId) {
    // This function deletes a comment and updates the UI
    try {
      // Call the API to delete the comment from the database
      await hootService.deleteComment(hootId, commentId);
      
      // Update the local state by filtering out the deleted comment
      setHoot({
        ...hoot,
        comments: hoot.comments.filter(comment => comment._id !== commentId)
      });
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  }

   // Add these new functions right here, after handleDeleteComment
  function handleEditComment(comment) {
    setEditingComment(comment);
  }

  function handleCancelEdit() {
    setEditingComment(null);
  }

  async function handleUpdateComment(commentId, commentData) {
    try {
      await hootService.updateComment(hootId, commentId, commentData);
      
      // Update the local state with the edited comment
      setHoot({
        ...hoot,
        comments: hoot.comments.map(comment => 
          comment._id === commentId ? {...comment, text: commentData.text} : comment
        )
      });
      
      // Exit edit mode
      setEditingComment(null);
    } catch (error) {
      console.error('Error updating comment:', error);
    }
  }

  console.log('Current hoot state:', hoot);
  
  if (!hoot) {
    console.log('Rendering loading state');
    return <div>Loading...</div>;
  }

  console.log('Rendering hoot details');
  return (
    <div>
      <h1>{hoot.title}</h1>
      <div>
        <p>{hoot.category}</p>
      </div>
      <p>{hoot.text}</p>
      <p>
        Posted by {hoot.author.name} on {new Date(hoot.createdAt).toLocaleDateString()}
      </p>

    
      <div className="hoot-actions">
        {/* Add Edit button */}
        <button 
          onClick={() => navigate(`/hoots/${hootId}/edit`)}
          className="edit-btn"
        >
          EDIT HOOT
        </button>
        
        <button 
          onClick={handleDeleteHoot}
          className="delete-btn"
        >
          DELETE HOOT
        </button>
      </div>

      <section>
        <h2>Comments</h2>
        {/* Conditionally render either the regular form or the editing form */}
        {!editingComment ? (
          <CommentForm hootId={hootId} setHoot={setHoot} />
        ) : (
          <div className="edit-comment-container">
            <h3>Edit Comment</h3>
            <CommentForm 
              hootId={hootId} 
              setHoot={setHoot} 
              commentToEdit={editingComment}
              onUpdateComment={handleUpdateComment}
              onCancelEdit={handleCancelEdit}
            />
          </div>
        )} 

        {hoot.comments.map((comment) => (
          <article key={comment._id} className="comment">
            <header>
              <p>
                {/* Handle both populated and unpopulated author fields */}
                {typeof comment.author === 'object' 
                  ? `${comment.author.name} posted on ${new Date(comment.createdAt).toLocaleDateString()}`
                  : `Posted by User on ${new Date(comment.createdAt).toLocaleDateString()}`}
              </p>
              {/* Only show edit/delete buttons if user is the author */}
              {(() => {
                // Get the current logged-in user
                const currentUser = getUser();
                
                // Log information to help debug why buttons aren't showing
                console.log('Comment author:', comment.author);
                console.log('Current user:', currentUser);
                console.log('Is author an object?', typeof comment.author === 'object');
                console.log('Is user logged in?', !!currentUser);
                console.log('Author ID:', comment.author?._id);
                console.log('Current user ID:', currentUser?._id);
                console.log('Do IDs match?', currentUser && comment.author && comment.author._id === currentUser._id);
                
                // Return the original conditional rendering
                return typeof comment.author === 'object' && 
                  getUser() && 
                  comment.author._id === getUser()._id && (
                  <div className="comment-actions">
                    <button 
                      onClick={() => handleEditComment(comment)}
                      className="edit-btn"
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => handleDeleteComment(comment._id)}
                      className="delete-btn"
                    >
                      Delete
                    </button>
                  </div>
                );
              })()}
            </header>
            <p>{comment.text}</p>
          </article>
        ))}
      </section>
    </div>
  );
}