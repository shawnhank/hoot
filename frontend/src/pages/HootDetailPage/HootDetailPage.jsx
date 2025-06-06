import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import * as hootService from '../../services/hootService';

export default function HootDetailPage() {
  console.log('HootDetailPage rendering');
  const [hoot, setHoot] = useState(null);
  const params = useParams();
  console.log('URL params:', params);
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
     
      <div>
        <h2>Comments</h2>
          {hoot.comments && hoot.comments.length > 0 ? (
          <div className="comments-list">
            {hoot.comments.map((comment) => (
              <div key={comment._id} className="comment">
                <p>{comment.text}</p>
                <p className="comment-meta">
                  {/* Handle both populated and unpopulated author fields */}
                  {typeof comment.author === 'object' 
                    ? `Posted by ${comment.author.name}` 
                    : 'Posted by User'} 
                  {comment.createdAt && ` on ${new Date(comment.createdAt).toLocaleDateString()}`}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p>No comments yet.</p>
        )}
      </div>
      
      
    </div>
  );
}