'use strict'

const SirenMediaType = 'application/vnd.siren+json'
    

const SirenLink = (rel, href) =>
    JSON.parse(`{
        "rel": ["${rel}"],
        "href": "${href}"
    }`)

const SirenAction = (name, title, method, href, fields) =>{
    const json = `{
        "name": "${name}",
        "title": "${title}",
        "method" : "${method}",
        "href": "${href}",
        "type": "${SirenMediaType}"
        ${fields? `,"fields": ${fields}` : ''}
    }`
    return JSON.parse(json)
}

    
/**
 * @param {Array<String>} class
 * @param {Array<Object>} properties
 * @param {Array<EmbeddedEntity>} entities
 * @param {Array<SirenLink>}links
 * @param {Array<SirenAction>} actions
 */
function toSirenObject (classes, properties, entities, links, actions) {
    const json =`{
        "class": ["${classes}"],
        "properties": ${properties},
        "entities": [${entities}],
        "links": ${links},
        "actions": [${actions}]
    }`
    return JSON.parse(json)
}
    
/**
 * @param {String} uri
 * @returns {SirenLink}
 */
const selfLink = (uri) => SirenLink('self', uri)

function addField(name, type){
    return JSON.parse(`{
        "name": "${name}",
        "type": "${type}"
    }`)
    
} 

function addSubEntity(classes, rel, properties, links, actions, title){
    const json = `{
        "rel": ["${rel}"],
        "properties": ${properties},
        "class": ["${classes}"],
        "links": ${links},
        "actions": ${actions},
        "title": "${title}"
    }`
    return JSON.parse(json)
}

module.exports = {selfLink, addField, addSubEntity, toSirenObject, SirenAction, SirenLink}