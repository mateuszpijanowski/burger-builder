import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://my-burger-ca526.firebaseio.com/'
});

export default instance;