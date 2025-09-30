import axios from 'axios';

const BASE_URL = 'http://localhost:5000';

export const login = (userData) => axios.post(`${BASE_URL}/login`, userData);
export const register = (userData) => axios.post(`${BASE_URL}/register`, userData);
