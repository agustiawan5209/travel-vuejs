import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8000'; // Ganti dengan URL backend
axios.defaults.withCredentials = true;

export default axios;