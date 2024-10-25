import React from 'react';
import { useAuth } from './AuthContext';

const ProtectedRoute = () => {
  const { user, token } = useAuth();

  if (!user) {
    return <h2>You need to log in</h2>;
  }

  return (
    <div>
      <h2>Welcome, {user}</h2>
      <p>Your token: {token}</p>
    </div>
  );
};

export default ProtectedRoute;