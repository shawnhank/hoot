import { useState } from 'react';
import { Routes, Route } from 'react-router';
import HomePage from '../HomePage/HomePage';
import PostListPage from '../PostListPage/PostListPage';
import NewPostPage from '../NewPostPage/NewPostPage';
import './App.css';

export default function App() {
  const [user, setUser] = useState(null);

  return (
    <main className="App">
      <section id="main-section">
        {user ? (
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/posts" element={<PostListPage />} />
            <Route path="/posts/new" element={<NewPostPage />} />
          </Routes>
        ) : (
          <Routes>
            <Route path="/" element={<HomePage />} />
          </Routes>
        )}
      </section>
    </main>
  );
}

