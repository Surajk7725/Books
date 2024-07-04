import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './components/landing';
import Login from './components/login';
import SignUp from './components/signup';
import Forgot from './components/forgot';
import Update from './components/updatePassword';
import Home from './components/user/home';
import Settings from './components/user/settings';
import Help from './components/user/help';
import Contactus from './components/contact';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgot" element={<Forgot />} />
        <Route path="/update-password" element={<Update />} />
        <Route path="/home" element={<Home />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/help-center" element={<Help />} />
        <Route path="/contactus" element={<Contactus />} />
      </Routes>
    </Router>
  );
}

export default App;
