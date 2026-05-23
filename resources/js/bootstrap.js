import axios from 'axios';

window.axios = axios;

// HEADER AJAX
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

// AMBIL CSRF TOKEN DARI META TAG
const token = document
    .querySelector('meta[name="csrf-token"]')
    ?.getAttribute('content');

// SET CSRF TOKEN KE HEADER AXIOS
if (token) {
    window.axios.defaults.headers.common['X-CSRF-TOKEN'] = token;
} else {
    console.error('CSRF token not found');
}