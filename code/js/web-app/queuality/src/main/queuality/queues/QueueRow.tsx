import React from 'react'
import { Table, Icon } from 'semantic-ui-react'
import { FunctionsDropdown } from './DropdownDisplay'
import { Queue } from './queueModel'

/**
 *  @property name - The name of the queue
 *  @property subject - The subject of the queue
 */

export interface QueueDisplayProps {
    name: string,
    subject: string,
    priority: boolean,
    _id: string,
    handleDeleteQueue?: (queue: Queue) => void
    handleEditQueue?: (queue: Queue) => void
}  

/**
 * @param {QueueDisplayProps} props - The props object.
 * @returns the React Element used to render the component.
 */

export function QueueRow(props: QueueDisplayProps) {
    return(
        <>
        <Table.Row>            
            <Table.Cell>
                {props.name} 
            </Table.Cell>
            <Table.Cell>
                {props.subject}
            </Table.Cell>
            <Table.Cell textAlign='left'>
                {
                    props.priority ?
                    <Icon name='check square outline' />
                    :
                    <Icon name='times circle outline' />
                }
               
            </Table.Cell>
            <Table.Cell>
                <FunctionsDropdown 
                    name = {props.name}
                    subject = {props.subject}
                    priority = {props.priority}
                    _id = {props._id}
                    deleteQueue = {props.handleDeleteQueue}
                    editQueue = {props.handleEditQueue}
                />
            </Table.Cell>
        </Table.Row>
    </>
    )
}
