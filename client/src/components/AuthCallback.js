import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const AuthCallback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { fetchUser } = useAuth();

  useEffect(() => {
    const token = searchParams.get('token');
    if (token) {
      localStorage.setItem('token', token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      fetchUser();
      navigate('/');
    } else {
      navigate('/login');
    }
  }, [searchParams, navigate, fetchUser]);

  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <div className="spinner"></div>
      <p>جاري تسجيل الدخول...</p>
    </div>
  );
};

export default AuthCallback;
