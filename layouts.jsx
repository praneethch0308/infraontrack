import React from 'react';
import { Outlet } from 'react-router-dom';
import './src/App.css'
import Sidebar from './src/components/Sidebar';
function Layout() {
  return (
    <div className="app">
      <div className="main-content mt-10">
      <Sidebar  />
      <div className="content">
        <main>
          <Outlet />
        </main>
        </div>
      </div>
    </div>
  );
}

export default Layout;