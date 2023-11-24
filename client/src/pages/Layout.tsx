import React from 'react';
import { Outlet } from 'react-router-dom';
import HeaderComponent from '../components/Header/Header.component';
import styles from './Layout.module.css';

export default function Layout() {
  return (
    <div className={styles['layout-container']}>
      <HeaderComponent className={styles['layout-header']} />
      <Outlet />
    </div>
  );
}
