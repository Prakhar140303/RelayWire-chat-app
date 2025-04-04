import React,{useEffect} from 'react'
import Navbar from './components/Navbar'
import {Routes, Route, Navigate} from 'react-router-dom'
import HomePage from './pages/HomePage'
import SignUpPage from './pages/SignUpPage'
import LoginPage from './pages/LoginPage'
import SettingPage from './pages/SettingPage'
import ProfilePage from './pages/ProfilePage'
import {userAuthStore} from './store/useAuthStore.js';
import {Loader} from 'lucide-react'
const App = () => {
  const {authUser,checkAuth,isCheckingAuth} = userAuthStore();
  useEffect(()=>{
    checkAuth();
  },[checkAuth]);
  console.log({isCheckingAuth});
  console.log({authUser});
  if(isCheckingAuth && !authUser) return(
    <div className='flex items-center justify-center h-screen'>
      <Loader className="size-10 animate-spin"/>
    </div>
  )
  return (
    <div>
      <Navbar/>
      <Routes>
        <Route path='/' element={authUser ? <HomePage/>: <Navigate to="/login"/> }/>
        <Route path='/signup' element={<SignUpPage/>}/>
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/setting' element={authUser ? <SettingPage/>: <Navigate to="/login"/>}/>
        <Route path='/profile' element={authUser ? <ProfilePage/>: <Navigate to="/login"/>}/>
      </Routes>
    </div>
  )
}

export default App