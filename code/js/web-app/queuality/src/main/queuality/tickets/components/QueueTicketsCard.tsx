import React from 'react'
import { Button, Card } from 'semantic-ui-react'
import { QueueTicket } from '../ticketsModel'

export interface QueueTicketCardProps {
    ticket: QueueTicket
    addTicket?: (queueId: string) => void
}
export function QueueTicketCard(props: QueueTicketCardProps) {

    const handleTicketIncrement = (queueId: string) => {
        if(props.addTicket)
            props.addTicket(queueId);
    }

    return(        
        <Card>
            <Card.Content>
                <Card.Header>{props.ticket.name}{props.ticket.nrTicketsAnswered}</Card.Header>
                <Card.Meta>{props.ticket.subject}</Card.Meta>
            </Card.Content>
            <Card.Content extra>
                <Button style={{color: 'white', backgroundColor: '#85C1E9'}} onClick={() => handleTicketIncrement(props.ticket._id)}>
                    Next
                </Button>
            </Card.Content>
        </Card>
    )       
}