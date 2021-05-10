'use strict'
const siren = require('../../common/siren.js')

const getTickets = [siren.selfLink('/api/tickets')]
const getWaitingTickets = (waiting) =>[siren.selfLink(`/api/tickets?waiting=${waiting}`)]
const getEmployeeLinks = (id) => [siren.selfLink(`/api/employees/${id}`)]
const addEmployeeLinks = (id) => [siren.selfLink('/api/employees'), siren.SirenLink(['/rel/employee'], `/api/employees/${id}`)]
const updateEmployeeLinks = (id) => [siren.selfLink(`/api/employees/${id}`), siren.SirenLink(['/rel/employees'],'/api/employees')]
const deleteEmployeeLinks = [siren.SirenLink(['/rel/employees'],'/api/employees')]
