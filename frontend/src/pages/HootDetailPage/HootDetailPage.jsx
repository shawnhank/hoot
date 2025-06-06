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
      <p>
        Posted by {hoot.author.name} on {new Date(hoot.createdAt).toLocaleDateString()}
      </p>
      <p>{hoot.text}</p>
      <p>Category: {hoot.category}</p>
    </div>
  );
}