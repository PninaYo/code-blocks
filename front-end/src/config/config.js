const BASE_URL = process.env.NODE_ENV === 'production'
    ? 'https://codeblocks-api.onrender.com'
    : 'http://localhost:5000';
export default BASE_URL;



