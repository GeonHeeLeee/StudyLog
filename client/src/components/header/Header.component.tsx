import React from 'react';
import { Link } from 'react-router-dom';
import useLoginState from '../../stores/login';
import styles from './Header.module.css';
import { FaBookOpen, FaSearch } from 'react-icons/fa';
import { IoIosSettings, IoMdHome } from 'react-icons/io';
import { ImProfile } from 'react-icons/im';
import { CiLogout } from "react-icons/ci";

export default function Header() {
  const { signOut } = useLoginState();
  // TODO: 아이콘 넣기
  return (
    <aside className={styles['layout-header']}>
      <ul className={styles.navbar}>
        <li>
          <strong>StudyLog</strong>
        </li>
        <li>
          <Link to='/'>
            <IoMdHome />
            Home
          </Link>
        </li>
        <li>
          <Link to='/search'>
            <FaSearch />
            Search
          </Link>
        </li>
        <li>
          <Link to='/profile'>
            <ImProfile />
            Profile
          </Link>
        </li>
        <li>
          <Link to='/setting'>
            <IoIosSettings />
            Setting
          </Link>
        </li>
        <li>
          <Link to='/schedule'>
            <FaBookOpen />
            Schedule
          </Link>
        </li>
        <li onClick={() => signOut()}>
          <CiLogout />
          로그아웃
        </li>
      </ul>
    </aside>
  );
}
