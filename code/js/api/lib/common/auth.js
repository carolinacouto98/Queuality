const error = require('./error.js')
const service = require('../services/employee-services.js')

module.exports = {
    requested: () => async (req, res, next) => {
        return next()
        try {
            if (!req.isAuthenticated()) 
                throw error.CustomException('User should be logged in to access this resource.', error.FORBIDDEN)
            const employee = await service.getEmploy(req.user.email)
            req.employee = employee
            next()
        } catch (error) { 
            next(error)
        }
    },
    optional: () => async (req, res, next) => {
        return next()
        try {
            if (!req.isAuthenticated()) return next()
            const employee = await service.getEmploy(req.user.email)
            req.employee = employee
            next()
        } catch (error) { 
            next(error) 
        }
    }
}