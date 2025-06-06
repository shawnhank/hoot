import { useState, useEffect, useContext } from 'react';
import { Routes, Route } from 'react-router';
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
 
  useEffect(() => {
    const fetchAllHoots = async () => {
      const hootsData = await hootService.index();
      // update to set state:
      setHoots(hootsData);
    };
    if (user) fetchAllHoots();
  }, [user]);

  return (
    <main className="App">
      <NavBar user={user} setUser={setUser} />
      <section id="main-section">
        {user ? (
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/hoots" element={<HootListPage hoots={hoots}/>} />
            <Route path="/hoots/new" element={<NewHootPage />} />
            <Route path="/hoots/:hootId" element={<HootDetailPage />}  />
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