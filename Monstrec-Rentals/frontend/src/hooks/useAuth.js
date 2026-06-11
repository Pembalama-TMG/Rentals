import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { setUser, setToken, setError, logout as logoutAction } from '../redux/slices/authSlice.js';
import { authAPI } from '../services/api.js';

export const useAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, token, isLoading, error } = useSelector((state) => state.auth);

  const register = async (data) => {
    try {
      const response = await authAPI.register(data);
      dispatch(setToken(response.token));
      dispatch(setUser(response.user));
      toast.success('Registration successful!');
      navigate('/');
      return response;
    } catch (err) {
      dispatch(setError(err));
      toast.error(err);
      throw err;
    }
  };

  const login = async (email, password) => {
    try {
      const response = await authAPI.login({ email, password });
      dispatch(setToken(response.token));
      dispatch(setUser(response.user));
      toast.success('Login successful!');
      navigate(response.user.role === 'admin' ? '/admin/dashboard' : '/');
      return response;
    } catch (err) {
      dispatch(setError(err));
      toast.error(err);
      throw err;
    }
  };

  const logout = () => {
    dispatch(logoutAction());
    toast.success('Logged out successfully');
    navigate('/');
  };

  const getProfile = async () => {
    try {
      const response = await authAPI.getProfile();
      dispatch(setUser(response.user));
      return response.user;
    } catch (err) {
      toast.error(err);
      throw err;
    }
  };

  const updateProfile = async (data) => {
    try {
      const response = await authAPI.updateProfile(data);
      dispatch(setUser(response.user));
      toast.success('Profile updated successfully!');
      return response.user;
    } catch (err) {
      toast.error(err);
      throw err;
    }
  };

  return {
    user,
    token,
    isLoading,
    error,
    register,
    login,
    logout,
    getProfile,
    updateProfile,
    isAuthenticated: !!token,
    isAdmin: user?.role === 'admin',
  };
};

export default useAuth;
