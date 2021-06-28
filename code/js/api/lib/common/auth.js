const error = require('./error.js')
const service = require('../services/employee-services.js')

module.exports = (role) => async (req, res, next) => {
    try{
        if (!req.oidc?.isAuthenticated()) 
            throw error.CustomException('User should be logged in to access this resource.', error.FORBIDDEN)
        const employee = await service.getEmploy(req.oidc.user.sub)
        if (!employee || (role && !employee.roles.includes(role))) 
            throw error.CustomException(`User ${req.oidc.user.name} does not have permissions to access this resource.`, error.UNAUTHORIZED)
        req.employee = employee
        next()
    } catch (error) { 
        next(error) 
    }
}