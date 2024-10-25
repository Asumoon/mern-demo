import axios from 'axios';
import { getConfig } from './config';

// Get the API URL from the configuration
const { apiUrl } = getConfig();

// Backend API Connection
const api = axios.create({
  baseURL: apiUrl,
  timeout: 5000, // (in ms)
});

export default api;