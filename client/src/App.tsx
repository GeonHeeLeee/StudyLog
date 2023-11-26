import { useEffect } from 'react';
import './App.css';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Layout from './pages/Layout';
import Main from './pages/Main/Main';
import Profile from './pages/Profile/Profile';
import SignIn from './pages/SignIn/SignIn';
import useLoginState from './stores/login';
import Schedule from './pages/Schedule/Schedule';
import Setting from './pages/Settings/Setting';
import SearchPage from './pages/Search/SearchPage';
import NotFound from './pages/Error/NotFound';
import NavToMain from './pages/NavToMain/NavToMain';

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
        <Route path='/' element={<NavToMain />} />
        <Route path='/main' element={<Main />} />
        <Route path='/profile/:userId' element={<Profile />} />
        <Route path='/schedule' element={<Schedule />} />
        <Route path='/search' element={<SearchPage />} />
        <Route path='/setting' element={<Setting />} />
        <Route path='/*' element={<NotFound />} />
      </Route>
      <Route path='/signin' element={<SignIn />} />
    </Routes>
  );
}

export default App;
