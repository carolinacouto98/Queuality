import { useEffect, useState } from 'react'
import { Header, Icon, Container, Card, Divider } from 'semantic-ui-react'
import { QueueService } from '../../common/services/QueueService'
import { SubjectsService } from '../../common/services/SubjectsService'
import { useParams } from 'react-router-dom'
import { CurrentTicketCard } from './components/CurrentTicketCard'
import { NextTicketButton } from './components/NextTicketButton'
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

    const fetchQueue = () => {
        props.queueService.getQueue(sectionId)
            .then(res => setQueue(res.properties))
    }

    useEffect(() => {
        fetchQueue()
        if(fetchQueue.length) fetchQueue()
    }, [fetchQueue])

    async function handleNextTicket() { 
        const res = await props.subjectsService.getSubjects(sectionId).send()
        const subject = res.body!!.entities.find(subject => queue!![0].includes(subject.properties?.name!!))
        props.queueService.getNextTicket(sectionId, subject?.properties?.name!!)
            .then(res => setTicket(res.properties))
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
                    <NextTicketButton hasNextTicket={!!props.queue.length} handleNextTicket={props.handleNextTicket}/>     
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