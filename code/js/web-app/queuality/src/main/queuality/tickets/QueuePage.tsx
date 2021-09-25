import { useEffect, useState } from 'react'
import { Header, Icon, Container, Card, Divider, Button } from 'semantic-ui-react'
import { QueueService } from '../../common/services/QueueService'
import { SubjectsService } from '../../common/services/SubjectsService'
import { useLocation, useParams } from 'react-router-dom'
import { CurrentTicketCard } from './components/CurrentTicketCard'
import { NextTicketsCard } from './components/NextTicketsCards'



type QueuePageProps = {
    queueService: QueueService
    subjectsService: SubjectsService
}

type Param = {
    sectionId: string
}

export default function QueuePage(props: QueuePageProps) {

    const { sectionId }  = useParams<Param>()
    const [queue, setQueue] = useState<string[]>()
    const [ticket, setTicket] = useState<string>()
    const [desk, setDesk] = useState<string>()
    const [request, setRequest] = useState<boolean>(false)

    const location = useLocation()
    useEffect(() => {
        const query = new URLSearchParams(location.search)
        setDesk(query.get('desk') as string)
    }, [location.search])

    useEffect(() => {
        props.queueService.getQueue(sectionId)
            .then(res => setQueue(res.properties))
    }, [request, props.queueService, sectionId])

    useEffect(() => {
        setTimeout(() => {setRequest(!request)}, 60000)
    })
   

    async function handleNextTicket() {     
        const res = await props.subjectsService.getSubjects(sectionId).send()
        const subject = res.body!!.entities.find(subject => queue!![0].includes(subject.properties?.name!!))
        props.queueService.getNextTicket(sectionId, subject?.properties?.name!!, desk!!)
            .then(res => setTicket(res.properties))  
            .then(() => setRequest(!request))         
        }  

    return (
        <>
            <PageHeader />
            <PageBody 
                nextTicket = {ticket}                
                queue = {queue} 
                handleNextTicket = {handleNextTicket} 
            />
        </>
    )
}

function PageHeader() {
    return (
        <>
            <Container>
                <Header as='h2' icon textAlign='center'>
                    <Icon name='ticket' circular />
                <Header.Content>Tickets</Header.Content>
                </Header>
            </Container>
        </>
    )
}

type TicketProps = {
    nextTicket?: string
    queue?: string[]
    handleNextTicket?: () => void
}

function PageBody(props: TicketProps) {
    return (
        <> 
            {props.queue ? 
                <Container>
                    <CurrentTicketCard ticket={props.nextTicket}/>
                    <Button disabled={!props.queue.length} onClick={() => 
                        { 
                            if(props.handleNextTicket) 
                                props.handleNextTicket()                                  
                        }
                    }>Next</Button>
                    <Divider hidden></Divider> 
                    <Card.Group itemsPerRow={5}>                   
                        {props.queue.slice(0,5).map((item, index) => 
                            <NextTicketsCard key={index} ticket={item}/>
                        )}
                    </Card.Group>
                </Container>
                : null
            }
        </>
    )
}