import React from 'react';
import { NavLink } from 'react-router-dom';
import { FiFile, FiBarChart2, FiDatabase } from 'react-icons/fi';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h3>E-Commerce Analytics Platform</h3>
      </div>
      
      <nav className="sidebar-nav">
        <NavLink
          to="/dashboard/add-file"
          className={({ isActive }) =>
            `nav-item ${isActive ? 'active' : ''}`
          }
        >
          <FiFile className="nav-icon" />
          <span>Add File</span>
        </NavLink>
        
        <NavLink
          to="/dashboard"
          end
          className={({ isActive }) =>
            `nav-item ${isActive ? 'active' : ''}`
          }
        >
          <FiBarChart2 className="nav-icon" />
          <span>Dashboard</span>
        </NavLink>
        
        <NavLink
          to="/dashboard/data-table"
          className={({ isActive }) =>
            `nav-item ${isActive ? 'active' : ''}`
          }
        >
          <FiDatabase className="nav-icon" />
          <span>Data Table</span>
        </NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;

