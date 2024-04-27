import axios from 'axios';
const port = 3000;
const linkURL = `http://localhost:${port}/`;

axios.defaults.baseURL = linkURL;
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.timeout = 1000;

export default axios;