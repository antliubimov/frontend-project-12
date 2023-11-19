import React, { useState, useMemo } from 'react';
import AuthContext from '../contexts';
import RouterConfig from '../routes/routerConfig';

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
      <RouterConfig />
    </div>
  </AuthProvider>
);

export default App;
