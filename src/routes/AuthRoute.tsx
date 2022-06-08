// NOT NECESSARY TO CHANGE

import { Route } from "react-router";
import { Redirect, RouteProps } from 'react-router-dom';

import Login from 'components/Login';
import useAuth from "../hooks/useAuth";
import { PATHS } from './constants';

export default function AuthRoute(routeProps: RouteProps) {
  const userDetails = useAuth();

  if(userDetails.loggedIn) {
    if(routeProps.path === PATHS.LOGIN) {
      return <Redirect to={PATHS.HOME} />
    }
    else {
      return <Route component={routeProps.component} {...routeProps} />
    }
  } else {
    if(routeProps.path === PATHS.LOGIN) {
      return <Route component={Login} {...routeProps} />
    } else
      return <Redirect to={{ pathname: PATHS.LOGIN}} />
  }
}