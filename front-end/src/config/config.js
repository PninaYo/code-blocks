const BASE_URL = process.env.NODE_ENV === 'production'
    ? ''
    : 'http://localhost:5000';
export default BASE_URL;
