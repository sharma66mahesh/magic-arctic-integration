import { useState } from 'react';
import { Switch, withRouter } from 'react-router-dom';

import Login from 'components/Login';
import Dashboard from 'components/Dashboard';
import AuthRoute from './routes/AuthRoute';
import { StoreContext as AuthContext } from './hooks/useAuth';
import './App.css';
import { PATHS } from 'routes/constants';
import { IAuthDetails } from './interfaces/users';

function App() {

  console.log(process.env);
  const [authState, setAuthState] = useState<IAuthDetails>({
    loggedIn: false,
    user: { 
      walletAddress: ''
    }
  });

  const contextValue = { ...authState, setAuthDetails: setAuthState};
  console.log();
  return (
    <AuthContext.Provider value={contextValue}>
      <div className="center-children cover-screen center-text">
        <Switch>
          <AuthRoute exact={true} path={PATHS.HOME} component={Dashboard} />
          <AuthRoute exact={true} path={PATHS.LOGIN} component={Login} />
          <AuthRoute exact={true} path={PATHS.DASHBOARD} component={Dashboard} />
          <AuthRoute component={Dashboard} />
        </Switch>
      </div>
    </AuthContext.Provider>
  );
}

export default withRouter(App);
