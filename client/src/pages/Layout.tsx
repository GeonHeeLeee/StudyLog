import { Outlet } from 'react-router-dom';

import styles from './Layout.module.css';
import Header from '../components/Header/Header.component';
// import Header from '../components/header/Header.component';

export default function Layout() {
  return (
    <div className={styles['layout-container']}>
      <Header />
      <div className={styles['main-body']}>
        <Outlet />
      </div>
    </div>
  );
}
