import { Grid, Table } from 'semantic-ui-react'
import { QueueRow } from './QueueRow'
import { NewQueue } from './NewQueue' 
import { Queue } from './queueModel'

export interface QueuesTableProps {
    queuesArray?: Array<Queue>
    err: String
    handleSetNewQueue?: (newQueue: Queue) => void
    handleDeleteQueue?: (queue: Queue) => void
    handleEditQueue?: (queue: Queue) => void
}

export function QueuesTable(props: QueuesTableProps) {
    return (
        <div className="ui one column stackable center aligned page grid">
            <div className="column twelve wide">
                <>
                <Grid columns='4'> 
                    <Grid.Column />
                    <Grid.Column />
                    <Grid.Column />
                    <Grid.Column>
                        <NewQueue 
                            addNewQueue={props.handleSetNewQueue} 
                            err = {props.err}
                        />
                    </Grid.Column>
                </Grid>
                <Table basic='very'>
                    <Table.Header>
                        <Table.Row>                                                              
                            <Table.HeaderCell>Name</Table.HeaderCell>
                            <Table.HeaderCell>Subject</Table.HeaderCell>           
                            <Table.HeaderCell>Priority</Table.HeaderCell>        
                            <Table.HeaderCell/>                                                                  
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {props.queuesArray!!.map(it =>
                            <QueueRow 
                                key={it._id} 
                                name = {it.name} 
                                subject = {it.subject} 
                                priority = {it.priority} 
                                _id = {it._id}
                                handleDeleteQueue = {props.handleDeleteQueue} 
                                handleEditQueue = {props.handleEditQueue}
                            />
                        )}                
                    </Table.Body>
                </Table>
                </>
            </div>
        </div>
    )
}