import { useAuthContext } from '@/context/AuthContext';

const useAuth = () => {
  const { user, token, login, logout } = useAuthContext();

  const isAuthenticated = !!token;

  const getAuthHeader = () => {
    return token ? { Authorization: `Bearer ${token}` } : {};
  };

  return {
    user,
    token,
    isAuthenticated,
    login,
    logout,
    getAuthHeader,
  };
};

export default useAuth;
