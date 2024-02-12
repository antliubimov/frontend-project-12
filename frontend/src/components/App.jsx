import React, { useState, useMemo } from 'react';
import { ToastContainer } from 'react-toastify';
import { AuthContext } from '../contexts/index';
import RouterConfig from '../routes/routerConfig';
import Navbar from './Navbar';

const AuthProvider = ({ children }) => {
  const currentUser = JSON.parse(localStorage.getItem('user'));
  const [user, setUser] = useState(currentUser ? { username: currentUser.username } : null);

  const logIn = (userData) => {
    localStorage.setItem('user', JSON.stringify(userData));
    setUser({ username: userData.username });
  };

  const logOut = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  const getAuthHeader = () => {
    const userData = JSON.parse(localStorage.getItem('user'));
    return userData?.token ? { Authorization: `Bearer ${userData.token}` } : {};
  };

  const value = useMemo(
    () => ({
      user,
      logIn,
      logOut,
      getAuthHeader,
    }),
    [user],
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

const App = () => (
  <AuthProvider>
    <div className="d-flex flex-column h-100">
      <Navbar />
      <RouterConfig />
      <ToastContainer />
    </div>
  </AuthProvider>
);

export default App;
