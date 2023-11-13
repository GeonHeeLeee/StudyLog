import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import useLoginState from '../../stores/login';

export default function Header() {
  const { pathname } = useLocation();
  const { signOut } = useLoginState();

  return pathname !== '/signin' ? (
    <header>
      <ul>
        <li>
          <Link to='/'>Home</Link>
        </li>
        <li>
          <Link to='/'>Search</Link>
        </li>
        <li>
          <Link to='/'>Profile</Link>
        </li>
        <li>
          <Link to='/'>Setting</Link>
        </li>
        <li>
          <Link to='/'>StudyLog</Link>
        </li>
        <li onClick={() => signOut()}>로그아웃</li>
      </ul>
    </header>
  ) : (
    <></>
  );
}
