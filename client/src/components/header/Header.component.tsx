import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Header() {
  const { pathname } = useLocation();

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
      </ul>
    </header>
  ) : (
    <></>
  );
}
