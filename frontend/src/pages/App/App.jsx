import { useState, useEffect, useContext } from 'react';
import { Routes, Route, useNavigate } from 'react-router';
import { getUser } from '../../services/authService';
import { useParams } from 'react-router';
import HomePage from '../HomePage/HomePage';
import HootListPage from '../HootListPage/HootListPage';
import HootDetailPage from '../HootDetailPage/HootDetailPage';
import NewHootPage from '../NewHootPage/NewHootPage';
import SignUpPage from '../SignUpPage/SignUpPage';
import LogInPage from '../LogInPage/LogInPage';
import NavBar from '../../components/NavBar/NavBar';
import * as hootService from '../../services/hootService';
import './App.css';


export default function App() {
  const [user, setUser] = useState(getUser());
  const [hoots, setHoots] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchAllHoots = async () => {
      const hootsData = await hootService.index();
      // update to set state:
      setHoots(hootsData);
    };
    if (user) fetchAllHoots();
  }, [user]);

 // Add this function to handle creating new hoots
  async function handleAddHoot(hootFormData) {
    console.log('hootFormData', hootFormData);
    // Create the hoot in the database
    const newHoot = await hootService.create(hootFormData);
    // Update the hoots state with the new hoot
    setHoots([...hoots, newHoot]);
    // Navigate to the hoots list page
    navigate('/hoots');
  }

  return (
    <main className="App">
      <NavBar user={user} setUser={setUser} />
      <section id="main-section">
        {user ? (
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/hoots" element={<HootListPage hoots={hoots} />} />
            <Route path="/hoots/new" element={<NewHootPage handleAddHoot={handleAddHoot} />} />
            <Route path="/hoots/:hootId" element={<HootDetailPage hoots={hoots} />}  />
            <Route path="/hoots/:hootId/edit" element={<NewHootPage handleAddHoot={handleAddHoot} />} />
            <Route path="*" element={null} />
          </Routes>
        ) : (
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/signup" element={<SignUpPage setUser={setUser} />} />
            <Route path="/login" element={<LogInPage setUser={setUser} />} />
            <Route path="*" element={null} />
          </Routes>
        )}
      </section>
    </main>
  );
};