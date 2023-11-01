import React, { useState, useMemo } from 'react';
import AuthContext from '../contexts';
import RouterConfig from '../routes/routerConfig';

const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);

  const logIn = () => setLoggedIn(true);

  /* eslint-disable */
  const logOut = () => {
    localStorage.removeItem('userId');
    setLoggedIn(false);
  };

  /* eslint-enable */
  const value = useMemo(
    () => ({ loggedIn, logIn, logOut }),
    [loggedIn],
  );

  return (
    <AuthContext.Provider value={value}>
      {useMemo(() => (
        children
      ), [children])}
    </AuthContext.Provider>
  );
};

const App = () => (
  <React.StrictMode>
    <AuthProvider>
      <RouterConfig />
    </AuthProvider>
  </React.StrictMode>
);

export default App;
