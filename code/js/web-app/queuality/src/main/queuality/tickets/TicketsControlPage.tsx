import React, { useEffect, useState } from 'react';
import { Header, Icon, Card, Breadcrumb } from 'semantic-ui-react';
import { QueueTicket } from './ticketsModel'
import { TicketsService } from './TicketsService'
import { QueueTicketCard } from './components/QueueTicketsCard';
import { NewQueueTicketsCard } from './components/NewQueueTicketsCard';
import { Link } from 'react-router-dom';
import { CurrentTicketCard } from './components/CurrentTicketCard';
import { NextTicketsCard } from './components/NextTicketsCards'

export namespace TicketsControl {

    type PageProps = {
        ticketsService : TicketsService
    }
    
    

    export function Page(props: PageProps) {

        const [tickets, setTickets] = useState<QueueTicket[]>([])
        const [currentTicket, setCurrentTicket] = useState<QueueTicket>()
        
            useEffect(() => {
                props.ticketsService.getTickets()
                    .then(items => {
                        setCurrentTicket(items[0])
                        items.splice(0, 1)
                        setTickets(items)
                    })
            }, [props.ticketsService, tickets, currentTicket])
        

        async function handleTicketNumberChange(queueId: string) : Promise<void> {
            if(tickets) {
                await props.ticketsService.setNextTicket(queueId)
                    .then(res => {
                        const newQueueTicketArr = tickets
                        newQueueTicketArr.push(res)
                        setTickets(newQueueTicketArr)
                    })
            }
        }

        return (
            <>
                <PageHeader />
                <PageBody 
                    currentTicket = {currentTicket}
                    tickets = {tickets} 
                    addTicket = {handleTicketNumberChange} 
                />
            </>
        )
    }

    function PageHeader() {
        return (
            <>
                <div className='Control-header'>                    
                    <Breadcrumb>
                        <Breadcrumb.Section link as={Link} to={'/queuality/'}>Home</Breadcrumb.Section>
                        <Breadcrumb.Divider icon='right chevron' />
                        <Breadcrumb.Section active>Tickets</Breadcrumb.Section>
                    </Breadcrumb>
                </div>
                <div>
                    <Header as='h2' icon textAlign='center' style={{ color: '#AFE5D1'}}>
                        <Icon style={{ backgroundColor: '#808283'}} name='ticket' circular />
                    <Header.Content style={{ color: '#808283'}} >Tickets</Header.Content>
                    </Header>
                </div>
            </>
        )
    }

    type TicketProps = {
        currentTicket?: QueueTicket
        tickets: QueueTicket[]
        addTicket?: (queueId: string) => void
    }

    function PageBody(props: TicketProps) {
        return (
            props.currentTicket && props.tickets ?
                <>
                    <CurrentTicketCard ticket={props.currentTicket}/>
                    {props.tickets.map((item, index) => 
                        <NextTicketsCard key={index} ticket={item}/>
                    )}
                    <NewQueueTicketsCard />
                </>
            : null
        )
    }
}