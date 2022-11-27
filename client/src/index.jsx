import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.css';
import './assets/styles.css';
import App from './components/App';

const container = document.getElementById('app');
const root = createRoot(container);

root.render(
  <Router>
    <Routes>
      <Route path='*' element={<App />} />
    </Routes>
  </Router>
);
