import React, { useEffect, useState } from 'react';
import { Header, Icon, Card, Breadcrumb } from 'semantic-ui-react';
import { QueueTicket } from './ticketsModel'
import { TicketsService } from './TicketsService'
import { QueueTicketCard } from './components/QueueTicketsCard';
import { NewQueueTicketsCard } from './components/NewQueueTicketsCard';
import { Link } from 'react-router-dom';

export namespace TicketsControl {

    type PageProps = {
        ticketsService : TicketsService
    }
    
    

    export function Page(props: PageProps) {

        const [queueTickets, setQueueTickets] = useState<QueueTicket[]>([])

        
            useEffect(() => {
                const ac = new AbortController();
                props.ticketsService.getQueueTickets()
                    .then(items => {
                            setQueueTickets(items)
                    })
                return () => ac.abort()
            }, [props.ticketsService, queueTickets])
        

        async function handleTicketNumberChange(queueId: string) : Promise<void> {
            if(queueTickets) {
                await props.ticketsService.setNextTicket(queueId)
                    .then(res => {
                        const newQueueTicketArr = queueTickets
                        newQueueTicketArr.push(res)
                        setQueueTickets(newQueueTicketArr)
                    })
            }
        }

        return (
            <>
                <PageHeader />
                <PageBody 
                    tickets = {queueTickets} 
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
                    <Header as='h2' icon textAlign='center' style={{marginTop: '2%', color: '#85C1E9'}}>
                    <Icon name='ticket' circular />
                    <Header.Content>Tickets</Header.Content>
                    </Header>
                </div>
            </>
        )
    }

    type TicketProps = {
        tickets?: QueueTicket[]
        addTicket?: (queueId: string) => void
    }

    function PageBody(props: TicketProps) {
        return (
            <Card.Group style={{marginLeft: '5%'}}>
                {props.tickets ?
                    <>
                        {props.tickets.map( (item, index) => 
                            <QueueTicketCard key={index} ticket={item} addTicket={props.addTicket}/>
                        )}          
                        <NewQueueTicketsCard />
                    </>
                    : null
                }
               
            </Card.Group>
        )
    }
}