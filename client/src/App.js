import React, { useState } from 'react';
import logo from './logo.svg';
import UserData from './Components/Customhooks';
import './App.css';
import { Routes, Route } from "react-router-dom";
import { LayOut,Home,About,Dashboard,Registration,NotFound } from './Components/Pages'

function App() {
  
  return (
    <Routes>
        <Route path="/" element={<LayOut />}>
          <Route index element={<Home />} />
          <Route path="register" element={<Registration />} />
          <Route path="about" element={<About />} />
          <Route path="dashboard" element={<Dashboard />} />

          {/* Using path="*"" means "match anything", catch all not matching URLs to Not found components. */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
  );
}

export default App;
