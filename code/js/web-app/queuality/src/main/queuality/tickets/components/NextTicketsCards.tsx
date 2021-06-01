import React from "react";
import { Card } from "semantic-ui-react";
import { QueueTicket } from "../ticketsModel";

interface NextTicketsCardsProps {
    ticket: QueueTicket
}

export function NextTicketsCard(props: NextTicketsCardsProps) {
    return (
        <Card>
            <Card.Content>
                <Card.Header>{props.ticket.ticketNumber}</Card.Header>
                <Card.Meta>{props.ticket.subject}</Card.Meta>
            </Card.Content>
        </Card>
    )
}