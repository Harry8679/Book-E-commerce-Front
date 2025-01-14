import { Navigate } from 'react-router-dom';

const AdminRoute = ({ isAuthenticated, userRole, children }) => {
  if (!isAuthenticated || userRole !== 1) {
    return <Navigate to="/signin" />;
  }
  return children;
};

export default AdminRoute;