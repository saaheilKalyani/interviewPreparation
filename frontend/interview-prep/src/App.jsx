import React, { useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Home/Dashboard';
import InterviewPrep from './pages/InterviewPrep/components/InterviewPrep';
import UserProvider from './context/userContext';


const App = () => {
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
        const payload = JSON.parse(atob(token.split('.')[1]));
        const isExpired = payload.exp * 1000 < Date.now();
        console.log('Token expired:', isExpired);
    }
    }, []);
  return (
    <UserProvider>
      <div>
        <Router>
          <Routes>
            {/* defalut route */}
            <Route path="/" element={<LandingPage />} />    

            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/interview-prep/:sessionId" element={<InterviewPrep />} />
          </Routes>
        </Router>

        <Toaster
          toastOptions={{
            className:"",
            style : {
              fontSize: '13px',
            }
          }}
        />
      </div>
    </UserProvider>
  )
}


export default App;