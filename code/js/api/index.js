'use strict'

const server = require('./lib/server.js')

server.run(5000, 'mongodb://localhost:27017', 'queuality')