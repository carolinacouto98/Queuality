'use strict'
const siren = require('../../common/siren.js')

const getQueuesLinks = [siren.selfLink('/api/queues')]
const addQueueLinks = [siren.selfLink('/api/queues')]
const updateQueueLinks = [siren.selfLink('/api/queues')]
const deleteQueueLinks = [siren.selfLink('/api/queues')]

function addQueueAction () {
   return siren.SirenAction(
        'add-queue',
        'Add a Queue',
        'POST',
        '/api/queues',
        JSON.stringify([
            siren.addField('name', 'text'),
            siren.addField('priority', 'boolean'),
            siren.addField('subject', 'text')
        ])
    )
} 

function updateQueueAction (queueId) {
    return siren.SirenAction(
        'update-queue',
         'Update a Queue',
         'PATCH',
        `/api/queues/${queueId}`,
        JSON.stringify([
            siren.addField('priority', 'boolean'),
            siren.addField('subject', 'text')
        ])
    )
} 

function deleteQueueAction (queueId) {
   return siren.SirenAction(
        'delete-queue',
        'Delete a Queue',
        'DELETE',
        `/api/queues/${queueId}`
    )
} 

function setSubEntities(queues){
    const subEntities = []
    queues.forEach(element => {
        subEntities.push(
            siren.addSubEntity(
                'Queue',
                '/rel/queue',
                JSON.stringify(element),  
                JSON.stringify([siren.selfLink(`/api/queues/${element._id}`), siren.SirenLink('/rel/current-ticket', `/api/queues/${element._id}/current-ticket`)]),
                JSON.stringify([updateQueueAction(element._id), deleteQueueAction(element._id)]),
                'Get Queue'
            )        
        )
    })
    return subEntities
}

module.exports = {
    getQueuesLinks,
    addQueueLinks,
    updateQueueLinks,
    deleteQueueLinks,
    addQueueAction,
    updateQueueAction,
    deleteQueueAction,
    setSubEntities
}
