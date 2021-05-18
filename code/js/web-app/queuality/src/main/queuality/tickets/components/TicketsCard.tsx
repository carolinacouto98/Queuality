import React from 'react'
import { Button, Card, Item} from 'semantic-ui-react'
import { QueueTicket } from '../ticketsModel'
export interface TicketsCardGroupProps {
    queueTickets: QueueTicket[]
}

export function TicketsCardGroup(props : TicketsCardGroupProps) {
    return (
        <Card.Group>
            { props.queueTickets.map(item => {
                return (
                    <Card key = {item.name}>
                    <Card.Content>
                        <Card.Header>{item.name}{item.ticketNumber}</Card.Header>
                        <Card.Meta>{item.subject}</Card.Meta>
                    </Card.Content>
                    <Card.Content extra>
                        <Button basic color='green'>
                            Next
                        </Button>
                    </Card.Content>
                    </Card>
                )
            })            
            }
        </Card.Group>
    )
}