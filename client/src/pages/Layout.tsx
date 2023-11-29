import { Outlet } from 'react-router-dom';

import HeaderComponent from '../components/header/Header.component';
import styles from './Layout.module.css';

export default function Layout() {
  return (
    <div className={styles['layout-container']}>
      <HeaderComponent />
      <div className={styles['main-body']}>
        <Outlet />
      </div>
    </div>
  );
}
