import { useState } from 'react';
import { useNavigate } from 'react-router';
import * as hootService from '../../services/hootService';

export default function NewHootPage() {
  const [content, setContent] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  
  const navigate = useNavigate();

  async function handleSubmit(evt) {
    evt.preventDefault();
    try {
      // sendRequest is expecting an object as the payload
      await hootService.create({ content });
      navigate('/api/hoots');
    } catch (err) {
      setErrorMsg('Adding Hoot Failed');
    }
  }

  return (
    <>
      <h2>Add Hoot</h2>
      <form onSubmit={handleSubmit}>
        <label>Hoot Content</label>
        <input
          type="text"
          value={content}
          onChange={(evt) => setContent(evt.target.value)}
          required
        />
        <button type="submit">ADD HOOT</button>
      </form>
      <p className="error-message">&nbsp;{errorMsg}</p>
    </>
  );
}