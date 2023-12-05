const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Users Api'
    },
    host: 'cse341-node-project2-w4.onrender.com/',
    schemes: ['https', 'http']
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

// this wil generate swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc);