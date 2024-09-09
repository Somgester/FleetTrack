import React, { useEffect, useState } from 'react';
import { LogIn, LogOut } from 'react-feather';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL;

const useUserData = () => {
  const [userdata, setUserdata] = useState({});
  console.log("response", userdata);

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await axios.get(`${apiUrl}/login/success`, { withCredentials: true });
        setUserdata(response.data.user);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    getUser();
  }, []);

  return userdata;
};

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const userdata = useUserData();
  const navigate = useNavigate();

  const loginwithgoogle = () => {
    window.open(`${apiUrl}/auth/google/callback`, "_self");
  };

  const logout = () => navigate('/logout');

  return (
    <div className={`${isSidebarOpen ? "w-64" : "w-0"} bg-white shadow-md transition-all duration-300 ease-in-out overflow-hidden flex flex-col h-full`}>
      <div className="flex items-center justify-center p-2 h-40">
        <img
          src="https://i.ibb.co/pWQ16dv/logo.webp"
          alt="FleetKu Logo" className="h-full w-auto object-contain"
        />
      </div>
      <nav className="flex-grow mt-8">
        <a href="/fleet" className="flex items-center py-2 px-4 text-gray-600 hover:bg-gray-100">
          <span className="mr-2">🚗</span> Fleet
        </a>
        <a href="/dashboard" className="flex items-center py-2 px-4 bg-indigo-600 text-white">
          <span className="mr-2">📊</span> Dashboard
        </a>
        <a href="/trip-log" className="flex items-center py-2 px-4 text-gray-600 hover:bg-gray-100">
          <span className="mr-2">🗺️</span> Trip log
        </a>
        <a href="/report" className="flex items-center py-2 px-4 text-gray-600 hover:bg-gray-100">
          <span className="mr-2">📄</span> Report
        </a>
        <a href="/account" className="flex items-center py-2 px-4 text-gray-600 hover:bg-gray-100">
          <span className="mr-2">👤</span> Account
        </a>
      </nav>
      <div className="p-4 mt-auto">
        {Object.keys(userdata).length > 0 ? (
          <div className="flex items-center text-gray-600 hover:text-gray-800">
            <img src={userdata.image} className="w-8 h-8 rounded-full mr-2" alt="User" />
            <span className="mr-2">{userdata.displayName}</span>
            <button onClick={logout} className="flex items-center">
              <LogOut className="w-5 h-5 mr-2" />
              Logout
            </button>
          </div>
        ) : (
          <button onClick={loginwithgoogle} className="flex items-center text-gray-600 hover:text-gray-800">
            <LogIn className="w-5 h-5 mr-2" />
            Login
          </button>
        )}
      </div>
    </div>
  );
};

export default Sidebar;