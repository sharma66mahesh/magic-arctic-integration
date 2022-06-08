// NOT NECESSARY TO CHANGE

import { Route } from "react-router";
import { Navigate, RouteProps } from 'react-router-dom';

import Login from 'components/Login';
import useAuth from "../hooks/useAuth";
import { PATHS } from './constants';

export default function AuthRoute(routeProps: RouteProps) {
  const userDetails = useAuth();

  if(userDetails.loggedIn) {
    if(routeProps.path === PATHS.LOGIN) {
      return <Navigate to={PATHS.HOME} />
    }
    else {
      return <Route element={routeProps.element} {...routeProps} />
    }
  } else {
    if(routeProps.path === PATHS.LOGIN) {
      return <Route element={<Login/>} {...routeProps} />
    } else
      return <Navigate to={{ pathname: PATHS.LOGIN}} />
  }
}