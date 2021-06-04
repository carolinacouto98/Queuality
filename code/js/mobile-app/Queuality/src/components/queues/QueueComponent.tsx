/* eslint-disable react/prop-types */
import { IonGrid, IonRow } from '@ionic/react'
import React from 'react'
import QueueCard from './QueueCard'
import { Queue } from '../../model/QueuesModel'

type QueueComponentProps = {
    queues: Array<Queue>,
}

const QueueComponent: React.FC <QueueComponentProps> = (props) => { 
    return (  
        <IonGrid>
            {props.queues.map((queue: Queue) => (
                <IonRow key={queue._id}>
                    <QueueCard queue={queue}  />
                </IonRow>
            ))}
        </IonGrid>
    )
}

export default QueueComponent