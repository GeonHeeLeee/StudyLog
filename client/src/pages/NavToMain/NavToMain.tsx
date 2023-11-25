import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function NavToMain() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname === '/') {
      navigate('/main');
    }
  }, []);
  
  return <></>;
}
