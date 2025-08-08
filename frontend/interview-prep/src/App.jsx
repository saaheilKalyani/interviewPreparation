import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import Login from './pages/Auth/Login';
import Signup from './pages/Auth/Signup';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Home/Dashboard';
import InterviewPrep from './pages/InterviewPrep/components/InterviewPrep';

const App = () => {
  return (
    <div className='text-5xl'>
      App
    </div>
  )
}


export default App;