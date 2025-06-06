import { useState } from 'react';
import { useNavigate } from 'react-router';
import * as hootService from '../../services/hootService';

export default function NewHootPage({ handleAddHoot }) {
  // Add this state to track the form data
  const [formData, setFormData] = useState({
    title: '',
    text: '',
    category: '',
  });
  // Add this state to track any errors 
  const [errorMsg, setErrorMsg] = useState('');
  // Add this navigate hook
  const navigate = useNavigate();
 // Add this function to handle form input changes
  function handleChange(evt) {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  }
  // 
  async function handleSubmit(evt) {
    evt.preventDefault();
    try {
      await handleAddHoot(formData);
      // No need for navigate here as handleAddHoot already does that
    } catch (err) {
      setErrorMsg('Adding Hoot Failed');
    }
  }

  return (
    <>
      <h2>Add Hoot</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor='title-input'>Title</label>
        <input
          required
          type='text'
          name='title'
          id='title-input'
          value={formData.title}
          onChange={handleChange}
        />
        <label htmlFor='text-input'>Text</label>
        <textarea
          required
          type='text'
          name='text'
          id='text-input'
          value={formData.text}
          onChange={handleChange}
        />
        <label htmlFor='category-input'>Category</label>
        <select
          required
          name='category'
          id='category-input'
          value={formData.category}
          onChange={handleChange}
        >
          <option value='News'>News</option>
          <option value='Games'>Games</option>
          <option value='Music'>Music</option>
          <option value='Movies'>Movies</option>
          <option value='Social Media'>Social Media</option>
          <option value='Sports'>Sports</option>
          <option value='Technology'>Technology</option>
          <option value='Television'>Television</option>
        </select>
        <button type="submit">ADD HOOT</button>
      </form>
      <p className="error-message">&nbsp;{errorMsg}</p>
    </>
  );
}