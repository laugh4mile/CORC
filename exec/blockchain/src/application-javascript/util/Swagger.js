const bodyParser = require("body-parser");
const swaggerJsdoc = require("swagger-jsdoc");

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Chaincode Application",
            version: "0.1.0",
            description: "Chaincode 통신 지원 RestAPI",
        },
        servers: [{
            url: "http://localhost:8080",
        }, ],
    },
    apis: ["./route/index.js"],
};

exports.specs = swaggerJsdoc(options);