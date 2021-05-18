import { Header, Segment } from 'semantic-ui-react'
import { NewQueue } from './NewQueue'
import { Queue } from './queueModel'

export interface NoQueueProps {
    handleSetNewQueue?: (newQueue: Queue) => void
    err: String
}

export function NoQueuesDisplay(props: NoQueueProps) { 
    return (
        <Segment placeholder basic>
            <Header icon>               
                No queues listed at the moment.
            </Header>
            <NewQueue 
                addNewQueue = {props.handleSetNewQueue}
                err = {props.err}
            />
        </Segment>
    ) 
}