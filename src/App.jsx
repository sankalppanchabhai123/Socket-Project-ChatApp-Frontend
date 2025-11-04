import { Navigate, Route, Routes } from 'react-router';
import './App.css';
import toast, { Toaster } from 'react-hot-toast';
import Homepage from './pages/Homepage';
import Login from './pages/Login';
import ChatPage from './pages/ChatPage';
import Signup from './pages/Signup';
import Onboard from './pages/Onboard';
import CallPage from './pages/CallPage';
import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { axiosInstance } from './lib/axios';
import PageLoading from './components/PageLoading';

function App() {
  const [authUser, setAuthUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check if user is authenticated on app load
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Check if user has token in localStorage
        const token = localStorage.getItem('token');

        if (token) {
          // Verify token with backend
          const res = await axiosInstance.get("/auth/me"); // Adjust endpoint as needed
          setAuthUser(res.data.user);
        }
      } catch (error) {
        console.error("Auth check failed:", error);
        // Clear invalid token
        localStorage.removeItem('token');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);
  //  tanstack query
  // const { data: authData, isLoading, error } = useQuery({
  //   queryKey: ["authUser"],
  //   queryFn: async () => {
  //     const res = await axiosInstance.get("/auth/...").then(console.log("server connected"));
  //     return res.authUser;
  //   },
  //   retry: false, //do not retry again and again
  // })
  // const authUser = authData?.user;
  if (isLoading) {
    return <PageLoading />
  }
  return (
    <div className="h-screen text-1xl " data-theme="coffee">
      <Routes>
        <Route path='/' element={authUser ? <Homepage /> : <Navigate to="/login" />} />
        <Route path='/signup' element={!authUser ? <Signup /> : <Navigate to="/" />} />
        <Route path='/login' element={!authUser ? <Login /> : <Navigate to="/" />} />
        <Route path='/chat' element={authUser ? <ChatPage /> : <Navigate to="/login" />} />
        <Route path='/onboard' element={authUser ? <Onboard /> : <Navigate to="/login" />} />
        <Route path='/notification' element={authUser ? <Notification /> : <Navigate to="/login" />} />
        <Route path='/call' element={<CallPage />} />
      </Routes>
      <Toaster />
    </div>
  )
}


export default App;