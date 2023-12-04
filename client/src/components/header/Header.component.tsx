import React, { useCallback } from 'react';

import { Link, useLocation } from 'react-router-dom';
import { FaBookOpen, FaSearch } from 'react-icons/fa';
import { IoIosSettings, IoMdHome } from 'react-icons/io';
import { ImProfile } from 'react-icons/im';
import { CiLogout } from 'react-icons/ci';

import useLoginState from '../../stores/login';
import styles from './Header.module.css';

export default function Header() {
  const location = useLocation();
  const path = location.pathname;

  const checkClicked = useCallback(
    (to: string) => (path.includes(to) ? styles.select : ''),
    [path]
  );

  const { signOut } = useLoginState();
  return (
    <aside className={styles['layout-header']}>
      <ul className={styles.navbar}>
        <li>
          <strong>StudyLog</strong>
        </li>
        <li className={checkClicked('/main')}>
          <Link to='/main'>
            <IoMdHome />
            Home
          </Link>
        </li>
        <li className={checkClicked('/search')}>
          <Link to='/search'>
            <FaSearch />
            Search
          </Link>
        </li>
        <li className={checkClicked('/profile')}>
          <Link to='/profile'>
            <ImProfile />
            Profile
          </Link>
        </li>
        <li className={checkClicked('/schedule')}>
          <Link to='/schedule'>
            <FaBookOpen />
            Schedule
          </Link>
        </li>
        <li className={checkClicked('/setting')}>
          <Link to='/setting'>
            <IoIosSettings />
            Setting
          </Link>
        </li>
        <li onClick={() => signOut()}>
          <span>
            <CiLogout />
            로그아웃
          </span>
        </li>
      </ul>
    </aside>
  );
}
