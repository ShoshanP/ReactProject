import React, { useState } from 'react';

import LoginForm from './loginPage'; 
import AdminPage from '../adminPage';

const Admin = () => {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginError, setLoginError] = useState(null);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    setLoginError(null);
  };

  const handleLoginError = (error) => {
    setIsLoggedIn(false);
    setLoginError(error);
  };

  return (
    <>
      {isLoggedIn ? (
     <AdminPage/>
      ) : (
        <>
          {loginError && <div style={{ color: 'red' }}>{loginError}</div>}
          <LoginForm onLoginSuccess={handleLoginSuccess} onLoginError={handleLoginError} />
        </>
      )}
   </>
  );
};

export default Admin;
