import { useState, useEffect } from 'react';

export default function PostListPage() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function fetchPosts() {
      const posts = await postService.index();
      setPosts(posts);
    }
    fetchPosts();
  }, []);

  return <h1>Post List Page</h1>
}