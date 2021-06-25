import React, { createContext, useEffect, useState, Dispatch } from 'react';
import { Header, Icon, Breadcrumb } from 'semantic-ui-react';
import { QueueTicket } from './ticketsModel'
import { TicketsService } from './TicketsService'
import { NewQueueTicketsCard } from './components/NewQueueTicketsCard';
import { Link } from 'react-router-dom';
import { CurrentTicketCard } from './components/CurrentTicketCard';
import { NextTicketsCard } from './components/NextTicketsCards'
import { NextTicketButton } from './components/NextTicketButton';

export namespace TicketsControl {

    type PageProps = {
        ticketsService : TicketsService
    }
    
    
    export const showTicketContext = createContext({
        showTicket: false,
        setShowTicket: () => {}
    })    

    export function Page(props: PageProps) {

        const [tickets, setTickets] = useState<QueueTicket[]>([])
            useEffect(() => {
                props.ticketsService.getTickets()
                    .then(items => {
                        setTickets(items)
                    })
            }, [props.ticketsService, tickets])
        

        async function handleNextTicket() : Promise<void> {
            if(tickets) {
                await props.ticketsService.setNextTicket(tickets[0]._id)
                    .then(res => {
                        setTickets(res)
                    })
            }
        }

        return (
            <>
                <PageHeader />
                <PageBody 
                    tickets = {tickets} 
                    nextTicket = {handleNextTicket} 
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
        tickets: QueueTicket[]
        nextTicket?: () => void
    }

    function PageBody(props: TicketProps) {
        const [ticket, setShowTicket] = useState(false)
        return (
            <>
                <showTicketContext.Provider value = {{showTicket: ticket, setShowTicket: () => setShowTicket(true)}}>
                    <CurrentTicketCard ticket={props.tickets[0]} showTicket={ticket}/>
                    <NextTicketButton nextTicket = {props.nextTicket}/>
                </showTicketContext.Provider>
                {props.tickets ?                  
                    props.tickets.map((item, index) => 
                        <NextTicketsCard key={index} ticket={item}/>
                    )
                : null}
                <NewQueueTicketsCard />
            </>
        )
    }
}