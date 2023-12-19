const corsOptions = {
    origin: [
        'https://code-blocks-c9c8.onrender.com/',
        'http://localhost:3000',
        'http://127.0.0.1:3000',
    ],
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    credentials: true // Access-Control-Allow-Credentials CORS header. Set to true to pass the header, otherwise it is omitted.
};

module.exports = corsOptions;

