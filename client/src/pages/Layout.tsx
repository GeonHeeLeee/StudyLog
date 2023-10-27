import React from 'react';
import { Outlet } from 'react-router-dom';
import HeaderComponent from '../components/header/Header.component';

export default function Layout() {
  return (
    <div>
      <HeaderComponent />
      <Outlet />
    </div>
  );
}
