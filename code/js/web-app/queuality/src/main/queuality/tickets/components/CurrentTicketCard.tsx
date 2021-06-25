import React from "react";
import { Card } from 'semantic-ui-react';
import { QueueTicket } from './../ticketsModel'

export interface CurrentTicketCardProps {
    ticket: QueueTicket
    //addTicket?: (queueId: string) => void
}

export function CurrentTicketCard(props: CurrentTicketCardProps) {
    return (
        <Card centered style ={{backgroundColor: '#AFE5D1'}}>
            <Card.Content>
                <Card.Header>
                    <h1 style={{marginTop: '15%'}}>
                        {props.ticket.ticketNumber}
                    </h1>
                </Card.Header>
                <Card.Meta style= {{marginBottom: '15%'}}>{props.ticket.subject}</Card.Meta>
            </Card.Content>
        </Card>
    )
}
