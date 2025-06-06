import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import * as hootService from '../../services/hootService';

export default function HootListPage() {
  const [hoots, setHoots] = useState([]);

  useEffect(() => {
    async function fetchHoots() {
      const hootsData = await hootService.index();
      setHoots(hootsData);
    }
    fetchHoots();
  }, []);

  return (
    <>
      <h1>Hoot List</h1>
      {hoots.length ? (
        <HootList hoots={hoots} />
      ) : (
        <p>No Hoots Yet!</p>
      )}
    </>
  );
}

const HootList = (props) => {
 return (
  <main>
   {props.hoots.map((hoot) => (
    <Link key={hoot._id} to={`/hoots/${hoot._id}`}>
     <article>
      <header>
       <h2>{hoot.title}</h2>
       <p>
        {`${hoot.author.username} posted on ${new Date(hoot.createdAt).toLocaleDateString()}`}
       </p>
      </header>
      <p>{hoot.text}</p>
     </article>
    </Link>
   ))}
  </main>
 );
};

