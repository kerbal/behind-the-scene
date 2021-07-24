import axios from 'axios';
import config from '../config';

const { apiUrl } = config;

const apiService = axios.create({
  baseURL: apiUrl,
  timeout: 30000,
});

let token: string = window.localStorage.getItem('token') || '';

if (token) {
  token = JSON.parse(token);
  apiService.defaults.headers = {
    Authorization: `Bearer ${token}`,
  };
}

apiService.interceptors.response.use((response) => response, async (error) => {
  if (error.response.status !== 401) {
    return new Promise((resolve, reject) => {
      reject(error);
    });
  }
  window.localStorage.removeItem('token');
  window.localStorage.removeItem('userSession');
  window.location.reload();
  return Promise.reject(error);
});

export default apiService;
