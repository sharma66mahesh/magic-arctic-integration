// NOT NECESSARY TO CHANGE

import { Navigate, RouteProps, Outlet } from 'react-router-dom';

import useAuth from "../hooks/useAuth";
import { PATHS } from './constants';

export default function AuthRoute(routeProps: RouteProps) {
  const userDetails = useAuth();

  if(userDetails.loggedIn) {
    if(routeProps.path === PATHS.LOGIN) {
      return <Navigate to={PATHS.HOME} />
    }
    else {
      return <Outlet />
    }
  } else {
    if(routeProps.path === PATHS.LOGIN) {
      return <Outlet />
    } else
      return <Navigate to={{ pathname: PATHS.LOGIN }} />
  }
}