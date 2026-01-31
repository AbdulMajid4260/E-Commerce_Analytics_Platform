import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Sidebar from '../components/Sidebar';
import AddFile from '../components/AddFile';
import DashboardView from '../components/DashboardView';
import DataTable from '../components/DataTable';
import './Dashboard.css';

const Dashboard = () => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="dashboard-container">
      <Sidebar />
      
      <div className="dashboard-main">
        <header className="dashboard-header glass-header">
          <h1>Dashboard</h1>
          <div className="header-actions">
            <div className="user-pill">
              <div className="user-avatar">
                {user?.username ? user.username.charAt(0).toUpperCase() : 'U'}
              </div>
              <span className="username">Welcome, {user?.username}</span>
            </div>
            <button onClick={handleLogout} className="btn dashboard-logout">
              Logout
            </button>
          </div>
        </header>

        <div className="dashboard-content">
          <Routes>
            <Route path="/" element={<DashboardView />} />
            <Route path="add-file" element={<AddFile />} />
            <Route path="data-table" element={<DataTable />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

