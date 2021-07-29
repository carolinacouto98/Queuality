import { useEffect, useState } from 'react'
import { Header, Icon, Container, Card, Divider } from 'semantic-ui-react'
import { QueueService } from '../../common/services/QueueService'
import { SubjectsService } from '../../common/services/SubjectsService'
import { useParams } from 'react-router-dom'
import { CurrentTicketCard } from './components/CurrentTicketCard'
import * as API from '../../common/FetchUtils'
import * as Siren from '../../common/Siren'
import * as SubjectModel from '../../common/model/SubjectModel'
import { NextTicketButton } from './components/NextTicketButton'
import { NextTicketsCard } from './components/NextTicketsCards'



type QueuePageProps = {
    queueService: QueueService
    subjectsService: SubjectsService
}

type Param = {
    sectionId: string
}

type QueueInfo = API.FetchInfo<Siren.Entity<string[], void>>
type QueueUpdate = API.Request<Siren.Entity<string[], void>>

type SubjectsInfo = API.FetchInfo<Siren.Entity<string, SubjectModel.Subject>>
type SubjectsUpdate = API.Request<Siren.Entity<string, SubjectModel.Subject>>

    
    /*export const showTicketContext = createContext({
        showTicket: false,
        setShowTicket: () => {}
    })*/   
    
function getQueueValue(queue?: QueueInfo): string[] | undefined {
    return queue?.result?.body?.properties
}

export default function QueuePage(props: QueuePageProps) {

    const { sectionId }  = useParams<Param>()
    const [queueList, setQueue] = useState<QueueInfo>()
    const [queueUpdate, setQueueUpdate] = useState<QueueUpdate>(props.queueService.getQueue(sectionId))
    const [subjects, setSubjects] = useState<SubjectsInfo>()
    const [ticket, setTicket] = useState<string>()

    useEffect(() => {
        async function sendQueueRequest(request: QueueUpdate) {
            try {
                setQueue({ status: API.FetchState.NOT_READY })
                const result: API.Result<Siren.Entity<string[], void>> = await request.send()
                if(!result.header.ok) {
                    return
                }
                setQueue({
                    status: result.header.ok && result.body ? API.FetchState.SUCCESS : API.FetchState.ERROR,
                    result
                })
            } catch(reason) {
                if(reason.name !== 'AbortError')
                    setQueue({status: API.FetchState.ERROR})
            }
        }
        sendQueueRequest(props.queueService.getQueue(sectionId))
    }, [sectionId, props.queueService, queueUpdate])

    const queue = getQueueValue(queueList)

    useEffect(() => {
        async function sendSubjectsRequest(request: SubjectsUpdate) {
            try {
                setSubjects({ status: API.FetchState.NOT_READY })
                const result: API.Result<Siren.Entity<string, SubjectModel.Subject>> = await request.send()
                if(!result.header.ok) {
                    return
                }
                setSubjects({
                    status: result.header.ok && result.body ? API.FetchState.SUCCESS : API.FetchState.ERROR,
                    result
                })
            } catch(reason) {
                if(reason.name !== 'AbortError')
                    setQueue({status: API.FetchState.ERROR})
            }
        }
        sendSubjectsRequest(props.subjectsService.getSubjects(sectionId))
    }, [sectionId, props.subjectsService] )

    async function handleNextTicket() { 
        const subject = subjects?.result?.body?.entities.find(subject => queue!![0].includes(subject.properties?.name!!))
        const result = await props.queueService.getNextTicket(sectionId, subject?.properties!!.name!!).send()
        setTicket(result.body?.properties!!)
        setQueueUpdate(props.queueService.getQueue(sectionId))
        if(!result.header.ok) {
            return
        }
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
    //const [ticket, setShowTicket] = useState(false)
    return (
        <>
            {/* <showTicketContext.Provider value = {{showTicket: ticket, setShowTicket: () => setShowTicket(true)}}>
                <CurrentTicketCard ticket={props.tickets[0]} showTicket={ticket}/>
                <NextTicketButton nextTicket = {props.nextTicket}/>
            </showTicketContext.Provider> */}    
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