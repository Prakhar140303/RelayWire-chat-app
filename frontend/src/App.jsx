import React,{useEffect} from 'react'
import Navbar from './components/Navbar'
import {Routes, Route, Navigate} from 'react-router-dom'
import HomePage from './pages/HomePage'
import SignUpPage from './pages/SignUpPage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import SettingPage from './pages/SettingPage.jsx'
import ProfilePage from './pages/ProfilePage.jsx'
import {userAuthStore} from './store/useAuthStore.js';
import {useThemeStore} from './store/useThemeStore.js'

import {Loader} from 'lucide-react'
import {Toaster} from 'react-hot-toast'
const App = () => {
  const {authUser,checkAuth,isCheckingAuth} = userAuthStore();
  const {theme} = useThemeStore();
  useEffect(()=>{
    checkAuth();
  },[checkAuth]);
  console.log({isCheckingAuth});
  console.log({authUser});
  if(isCheckingAuth && !authUser) return(
    <div className='flex items-center justify-center h-screen'>
      <Loader className="size-10 animate-spin"/>
    </div>
  );
  
  return (
    <div data-theme= {theme} >
      <Navbar/>
      <Routes>
        <Route path='/' element={authUser ? <HomePage/>: <Navigate to="/login"/> }/>
        <Route path='/signup' element={!authUser ? <SignUpPage/> :<Navigate to="/"/>}/>
        <Route path='/login' element={!authUser ?<LoginPage/> : <Navigate to="/"/>}/>
        <Route path='/setting' element={<SettingPage/>}/>
        <Route path='/profile' element={authUser ? <ProfilePage/>: <Navigate to="/login"/>}/>
      </Routes>
      <Toaster/>
    </div>
  )
}

export default App