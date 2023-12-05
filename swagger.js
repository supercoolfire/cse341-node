const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Users Api'
    },
<<<<<<< HEAD
    // host: 'localhost:3000',
    // schemes: ['http', 'https']
    host: 'cse341-node-project2-w4.onrender.com',
=======
    host: 'cse341-node-project2-w4.onrender.com/',
>>>>>>> bcd3c7b07a41c33b1ae21d1d4c7fb293d664aa36
    schemes: ['https', 'http']
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

// this wil generate swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc);