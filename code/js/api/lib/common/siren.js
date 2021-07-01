const HttpMethod  = Object.freeze({
    GET : 'GET',
    POST : 'POST',
    PATCH : 'PATCH',
    PUT : 'PUT',
    DELETE : 'DELETE'
})

/**
 * @class
 * @param {string} href
 * @param {Array<string>} rel
 */
class SirenLink {
    constructor(rel, href){
        this.rel = rel
        this.href = href
    }
}

/**
 * @class
 * @param {string} name
 * @param {Array<string>} type
 */

class Field {
    constructor(name, type){
        this.name = name
        this.type= type
    }
}

/**
 * @class
 * @param {string} name
 * @param {string } title
 * @param {HttpMethod} method
 * @param {string} href
 * @param {Array<Field>} fields
 */
class SirenAction {
  
    constructor(name, title, method, href, fields = undefined){
        this.name = name
        this.title = title
        this.method = method
        this.href = href
        this.type = 'application/vnd.siren+json'
        this.fields = fields
    }
}

/**
 * @class
 * @param {Array<string>} rel
 * @param {Array<SirenLink>} links
 * @param {Array<string>} classes
 * @param {Array<SirenAction>} actions
 * @param {string} title
 */
class EmbeddedEntity {
 
    constructor(rel, links, properties = undefined, classes = undefined, actions = undefined , title = undefined ){
        this.rel = rel
        this.properties = properties
        this.links = links
        this.class = classes
        this. actions = actions
        this. title = title
    }
}

/**
 * @class
 * @param {string} title
 * @param {Array<string>} classes
 * @param {Array<SirenLink>} links
 * @param {any} properties
 * @param {Array<SirenAction>} actions
 * @param {EmbeddedEntity} entities
 */

class Entity {
    constructor(title, classes, links, properties = undefined,  actions = undefined, entities = undefined) {
        this.title = title    
        this.class = classes
        this.properties = properties
        this.links = links
        this.entities = entities
        this.actions = actions
        
    }
}

const selfLink = (uri) => new SirenLink(['self'], uri)
const BASENAME = '/queuality/api'

module.exports = {
    BASENAME,
    selfLink,
    Entity,
    SirenLink,
    SirenAction,
    Field,
    EmbeddedEntity,
    HttpMethod
}