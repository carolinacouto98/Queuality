'use strict'
const repo = require('../repo/queue-repo.js')

function getQueues() {
    return repo.getQueues()
}
function getQueue(id) {
    return repo.getQueue(id)
        .catch(err => {
            if (err.message === 'The given queue does not exist') err.status = 404
            throw err
        })
}
function addQueue(name, type, description) {
    return repo.insertQueue({ 
        name: name,
        description: description
    })
}
function removeQueue(id) {
    return repo.deleteQueue(id)
        .catch(err => {
            if (err.message === 'The given queue does not exist') err.status = 404
            throw err
        })
}
function updateQueue(id, name, description) {
    return repo.updateQueue(id, name, description)
        .catch(err => {
            if (err.message === 'The given queue does not exist') err.status = 404
            throw err
        })
}
