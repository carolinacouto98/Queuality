'use strict'
const siren = require('../../common/siren.js')

const getCurrentQueueTicketLinks = (queueId) => [siren.selfLink(`/api/queues/${queueId}/current-ticket`)]
const getWaitingTicketsLinks = [siren.selfLink('/api/tickets')]
const addTicketLinks = [siren.selfLink('/api/tickets')]
const deleteTicketLinks = [siren.selfLink('/api/tickets')]
const updateAnsweredTicketsLinks = (queueId) => [siren.selfLink(`/api/queues/${queueId}/current-ticket`)]
const getTicketsLinks = [siren.selfLink('/api/tickets'), siren.SirenLink('ticket-queues', '/api/queues')]

function addTicketAction(){
    return siren.SirenAction(
        'add-ticket',
        'Add a Ticket',
        'POST',
        '/api/tickets',
        JSON.stringify([
            siren.addField('queueName', 'text'),
        ])
    )
}

function deleteTicketAction(){
    return siren.SirenAction(
        'delete-ticket',
        'Delete a Ticket',
        'PUT',
        '/api/tickets',
    )
}

function updateAnsweredTicketsAction(queueId){
    return siren.SirenAction(
        'update-tickets',
        'Update Answered Tickets',
        'PUT',
        `/api/queues/${queueId}/current-ticket`
    )
}

module.exports = {
    getCurrentQueueTicketLinks,
    getWaitingTicketsLinks,
    addTicketLinks,    
    updateAnsweredTicketsLinks,    
    deleteTicketLinks,
    getTicketsLinks,
    addTicketAction,
    updateAnsweredTicketsAction,
    deleteTicketAction
}
