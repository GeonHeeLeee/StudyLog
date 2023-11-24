import React from 'react';
import { useLocation } from 'react-router-dom';

export default function NotFound() {
  const location = useLocation();
  console.log(location);

  return <div>찾지못함</div>;
}
