import React from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
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
  );
}
