import React, { useCallback } from 'react';

import { Link, useLocation } from 'react-router-dom';
import { FaBookOpen, FaSearch } from 'react-icons/fa';
import { IoIosSettings, IoMdHome } from 'react-icons/io';
import { ImProfile } from 'react-icons/im';
import { CiLogout } from 'react-icons/ci';

import useLoginState from '../../stores/login';
import styles from './Header.module.css';
import useNetwork from '../../stores/network';

export default function Header() {
  const location = useLocation();
  const path = location.pathname;
  const { userInfo, signOut } = useLoginState();
  const { httpInterface } = useNetwork();

  const checkClicked = useCallback(
    (to: string) => (path.includes(to) ? styles.select : ''),
    [path]
  );

  const signOutHandler = async () => {
    const response = await httpInterface.logout();
    console.log(response);
    if (response.status === 200) {
      signOut();
    } else {
      alert('로그아웃을 실패하셨습니다');
    }
  };

  // TODO: 아이콘 넣기
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
          <Link to={'/profile/' + userInfo.userId}>
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
        {/* <li className={checkClicked('/setting')}>
          <Link to='/setting'>
            <IoIosSettings />
            Setting
          </Link>
        </li> */}
        <li onClick={signOutHandler}>
          <span>
            <CiLogout />
            로그아웃
          </span>
        </li>
      </ul>
    </aside>
  );
}
