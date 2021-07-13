const error = require('./error.js')
const service = require('../services/employee-services.js')

module.exports = {
    requested: () => async (req, res, next) => {
        try {
            if (!req.oidc?.isAuthenticated()) 
                throw error.CustomException('User should be logged in to access this resource.', error.FORBIDDEN)
            const employee = await service.getEmploy(req.oidc.user.sub)
            req.employee = employee
            next()
        } catch (error) { 
            next(error) 
        }
    },
    optional: () => async (req, res, next) => {
        try {
            if (!req.oidc?.isAuthenticated()) next()
            const employee = await service.getEmploy(req.oidc.user.sub)
            req.employee = employee
            next()
        } catch (error) { 
            next(error) 
        }
    }
}