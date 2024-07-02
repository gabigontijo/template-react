import PropTypes from 'prop-types';
import { Outlet, Navigate } from "react-router-dom";

import { useAuth } from "./authProvider";

const PrivateRoute = ({ element }) => {
  const auth = useAuth();
  if (!auth.token) return <Navigate to="/login" />;
  return <Outlet />;
};

PrivateRoute.propTypes = {
  element: PropTypes.element.isRequired,
};

export default PrivateRoute;