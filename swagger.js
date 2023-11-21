const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Users Api'
    },
    host: 'localhost:3000',
    schemes: ['http', 'https']
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

// this wil generate swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc);