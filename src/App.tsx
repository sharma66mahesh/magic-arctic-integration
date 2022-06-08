// NO CHANGES NEEDED

import { useState } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import Login from 'components/Login';
import Dashboard from 'components/Dashboard';
import AuthRoute from './routes/AuthRoute';
import { StoreContext as AuthContext } from './hooks/useAuth';
import './App.css';
import { PATHS } from 'routes/constants';
import { IAuthDetails } from './interfaces/users';

function App() {

  console.log(process.env);

  // auth state is set at the root of the app
  const [authState, setAuthState] = useState<IAuthDetails>({
    loggedIn: false,
    user: { 
      walletAddress: ''
    }
  });

  const contextValue = { ...authState, setAuthDetails: setAuthState};
  console.log();

  // basically there are three pages - home, login and dashboard
  return (
    <AuthContext.Provider value={contextValue}>
      <div className="center-children cover-screen center-text">
        
          <Routes>
            <Route path={PATHS.HOME} element={<Dashboard/>} />
            <Route path={PATHS.LOGIN} element={<Login />} />
            <Route path={PATHS.DASHBOARD} element={<Dashboard />} />
            <Route element={Dashboard} />
          </Routes>
      </div>
    </AuthContext.Provider>
  );
}

export default App;
