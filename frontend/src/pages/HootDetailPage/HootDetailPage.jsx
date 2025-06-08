import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import * as hootService from '../../services/hootService';
import CommentForm from '../../components/CommentForm/CommentForm';


export default function HootDetailPage() {
  console.log('HootDetailPage rendering');
  const [hoot, setHoot] = useState(null);
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
     
    <button 
      onClick={handleDeleteHoot}
      className="delete-btn"
    >
      DELETE HOOT
    </button>

      <section>
        <h2>Comments</h2>
        {/* Make use of the CommentForm component */}
        <CommentForm hootId={hootId} setHoot={setHoot} />
           
        {!hoot.comments || !hoot.comments.length ? (
          <p>There are no comments.</p>
        ) : (
          hoot.comments.map((comment) => (
            <article key={comment._id} className="comment">
              <header>
                <p>
                  {/* Handle both populated and unpopulated author fields */}
                  {typeof comment.author === 'object' 
                    ? `${comment.author.name} posted on ${new Date(comment.createdAt).toLocaleDateString()}`
                    : `Posted by User on ${new Date(comment.createdAt).toLocaleDateString()}`}
                </p>
              </header>
              <p>{comment.text}</p>
            </article>
          ))
        )}
      </section>
    </div>
  );
}