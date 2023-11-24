import { useEffect } from 'react';
import './App.css';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Layout from './pages/Layout';
import Main from './pages/Main/Main';
import Profile from './pages/Profile/Profile';
import SignIn from './pages/SignIn/SignIn';
import useLoginState from './stores/login';
import Calendar from './pages/Schedule/Calendar.component';
import Schedule from './pages/Schedule/Schedule';

function App() {
  const { isLogin, signOut } = useLoginState();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLogin) {
      navigate('/signin');
      signOut();
    }
  }, [isLogin, navigate]);

  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route path='/' element={<Main />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/schedule' element={<Schedule />} />
      </Route>
      <Route path='/signin' element={<SignIn />} />
    </Routes>
  );
}

export default App;
