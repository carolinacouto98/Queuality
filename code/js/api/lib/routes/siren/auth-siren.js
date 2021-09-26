'use strict'
const siren = require('../../common/siren.js')

const loginLinks = (issuers) => [
    siren.selfLink(`${siren.BASENAME}/auth/login`),
    ...issuers.map(issuer => new siren.SirenLink(['/rel/login'], `${siren.BASENAME}/auth/${issuer}/login`))
]

const signUpLinks = (issuers) => [
    siren.selfLink(`${siren.BASENAME}/auth/signup`),
    ...issuers.map(issuer => new siren.SirenLink(['/rel/signup'], `${siren.BASENAME}/auth/${issuer}/signup`))
]

module.exports = { loginLinks, signUpLinks }