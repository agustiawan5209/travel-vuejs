import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8000'; // Ganti dengan URL backend
axios.defaults.withCredentials = true;

// tambah request interceptor untuk menambahkan token ke setiap request
if (localStorage.getItem('token')) {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');
}

export default axios;