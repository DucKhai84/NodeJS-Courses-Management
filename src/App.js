import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserPage from './pages/UserPage';
import AuthPage from './pages/AuthPage';
import AdminPage from './pages/AdminPage';
import AdminLayout from '../src/layouts/AdminLayout';
import UserLayout from '../src/layouts/UserLayout';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthPage />} />

        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminPage />} />
        </Route>

        <Route path="/user" element={<UserLayout />}>
          <Route index element={<UserPage />} />
        </Route>

      </Routes>
    </Router>
  );

}


export default App;
