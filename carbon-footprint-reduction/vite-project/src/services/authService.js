import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const login = (userData) => axios.post(`${BASE_URL}/api/auth/login`, userData);
export const register = (userData) => axios.post(`${BASE_URL}/api/auth/register`, userData);
