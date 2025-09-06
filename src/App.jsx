import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './i18next';
import DashBoard from './pages/DashBoard';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DashBoard />} />
      </Routes>
    </BrowserRouter>
  );
}