import { Navigate } from 'react-router-dom';

// Placeholder Auth Context (will replace later)
const useAuth = () => ({
    user: null, // { name: 'Alice', role: 'provider' }
});

export default function ProtectedRoute({ children, allowedRoles }) {
    const { user } = useAuth();

    // Uncomment when Auth is fully implemented
    /*
    if (!user) {
      return <Navigate to="/login" replace />;
    }
  
    if (allowedRoles && !allowedRoles.includes(user.role) && user.role !== 'Both') {
      return <Navigate to="/dashboard" replace />;
    }
    */

    return children;
}
