import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import useLoginState from '../../stores/login';
import styles from './Header.module.css'

interface Props {
  className: string;
}
export default function Header({className}:Props) {
  const { pathname } = useLocation();
  const { signOut } = useLoginState();
  // TODO: 아이콘 넣기
  return (
    <aside className={className}>
      <ul className={styles.navbar}>
        <li>
          StudyLog
        </li>
        <li>
          <Link to='/'>Home</Link>
        </li>
        <li>
          <Link to='/search'>Search</Link>
        </li>
        <li>
          <Link to='/profile'>Profile</Link>
        </li>
        <li>
          <Link to='/setting'>Setting</Link>
        </li>
        <li>
          <Link to='/'>StudyLog</Link>
        </li>
        <li onClick={() => signOut()}>로그아웃</li>
      </ul>
    </aside>
  )
}
