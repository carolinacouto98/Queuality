import React, { useContext } from "react";
import { Card, Statistic } from 'semantic-ui-react';
import { QueueTicket } from './../ticketsModel'
import { TicketsControl } from './../TicketsControlPage'

export interface CurrentTicketCardProps {
    ticket: QueueTicket
    showTicket: boolean
}

export function CurrentTicketCard(props: CurrentTicketCardProps) {
    const context = useContext(TicketsControl.showTicketContext)

    return (
        <Card centered style ={{ backgroundColor: '#AFE5D1'}}>
                <Statistic style={{marginTop: '15%', marginBottom: '15%'}}> 
                {context.showTicket ?
                    <>                    
                        <Statistic.Value>{props.ticket ? props.ticket.ticketNumber : '--'}</Statistic.Value>
                        <Statistic.Label>{props.ticket.subject}</Statistic.Label>
                    </>
                :
                    <Statistic.Value>--</Statistic.Value>}
                </Statistic>
        </Card>
    )
}
