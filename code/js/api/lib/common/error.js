'use strict'
module.exports = {
    CustomException: (message, options) => {
        const err = Error(message)
        err.name = options.name
        err.status = options.status
        return err
    },
    CustomError: (err, options) => {
        err.name = options.name
        err.status = options.status
        return err
    },
    BAD_REQUEST: {name:'BAD_REQUEST', status:400},
    UNAUTHORIZED: {name:'UNAUTHORIZED', status:401},
    FORBIDDEN: {name:'FORBIDDEN', status:403},
    NOT_FOUND: {name:'NOT_FOUND', status:404},
    ALREADY_EXISTS: {name:'ALREADY_EXISTS', status:409},
    UNPROCESSABLE: {name:'UNPROCESSABLE', status:422},
    SERVER_ERROR: {name:'SERVER_ERROR', status:500}
} 