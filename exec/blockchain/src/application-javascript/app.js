'use strict';

// swagger
const swaggerUi = require("swagger-ui-express");
const {
	specs
} = require("./util/Swagger")

// express
const express = require('express')
const app = express()
const morgan = require('morgan');
const {
	indexRouter
} = require('./route')

app.use(express.json())
app.use(express.urlencoded({
	extended: false
}))
app.use(morgan('dev'))
app.use(
	"/api-docs",
	swaggerUi.serve,
	swaggerUi.setup(specs)
);

app.use('/', indexRouter)

app.listen(8080, () => {
	console.log('8080 server online');
})