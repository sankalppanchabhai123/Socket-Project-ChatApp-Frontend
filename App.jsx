import { Navigate, Route, Routes } from 'react-router';
import './App.css';
import toast, { Toaster } from 'react-hot-toast';
import Homepage from './pages/Homepage';
import Login from './pages/Login';
import ChatPage from './pages/ChatPage';
import Signup from './pages/Signup';
import Onboard from './pages/Onboard';
import CallPage from './pages/CallPage';
// import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { axiosInstance } from './lib/axios';
import PageLoading from './components/PageLoading';

function App() {
  //  tanstack query
  const { data: authUsers, isLoading, error } = useQuery({
    queryKey: ["authUser"],
    queryFn: async () => {
      const res = await axiosInstance.get("/auth/...").then(console.log("server connected"));
      return res.authUser;
    },
    retry: false, //do not retry again and again
  })
  // console.log({ authUser });
  // console.log({ isLoading });
  // console.log({ error });
  if (isLoading) {
    return <PageLoading />
  }
  return (
    <div className="h-screen text-1xl " data-theme="coffee">
      <Routes>
        <Route path='/' element={authUsers ? <Homepage /> : <Navigate to="/login" />} />
        <Route path='/signup' element={!authUsers ? <Signup /> : <Navigate to="/" />} />
        <Route path='/login' element={!authUsers ? <Login /> : <Navigate to="/" />} />
        <Route path='/chat' element={authUsers ? <ChatPage /> : <Navigate to="/login" />} />
        <Route path='/onboard' element={authUsers ? <Onboard /> : <Navigate to="/login" />} />
        <Route path='/notification' element={authUsers ? <Notification /> : <Navigate to="/login" />} />
        <Route path='/call' element={<CallPage />} />
      </Routes>
      <Toaster />
    </div>
  )
}

export default App;

