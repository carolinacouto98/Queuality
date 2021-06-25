const error = require('./error.js')
const service = require('../services/employee-services.js')
module.exports = (admin) => async (req, res, next) => {
    if (!req.oidc?.isAuthenticated()) 
        throw error.CustomException('User should be logged in to access this page.', error.FORBIDDEN)
    const employee = await service.getEmploy(req.oidc.user.sub)
    if (!employee || (admin && !employee.roles.find(role => role === 'admin'))) 
        throw error.CustomException(`User ${req.oidc.user.name} does not have permissions to access this page.`, error.UNAUTHORIZED)
    req.employee = employee
    next()
}