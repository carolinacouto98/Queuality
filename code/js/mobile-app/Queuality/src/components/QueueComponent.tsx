import { IonCol, IonGrid, IonRow } from '@ionic/react'
import React, { useState, useEffect} from 'react'
import '@capacitor-community/http'
import { Plugins } from '@capacitor/core'
import QueueCard from './QueueCard';

interface Queue {
    _id: string,
    name: string,
    subject: string,
    priority: boolean
}
const QueueComponent: React.FC = () => {
    const { Http } = Plugins
    const [queues, setQueues] = useState<Queue[]>([])

    useEffect( () => {
        async function loadQueues() {
            const path = 'http://localhost:3000/api/queues/'
            await Http.request (
                {
                    method: 'GET',
                    url: path,
                    headers: {
                        'accept' : 'application/json',
                        'content-type': 'application/json',
                    }
                }
            )
                .then(res => res.data)
                .then(data => setQueues(data.properties))
                .catch(e => console.log(e))
        }
        if(!queues.length) loadQueues()
        },[queues])

    return (  
     <IonGrid>
         <IonRow>
        {queues.map((queue: Queue) => (
            <IonCol key={queue._id}>
                <QueueCard 
                    id ={queue._id} 
                    name ={queue.name}
                    subject = {queue.subject}
                    priority = {queue.priority}/>
            </IonCol>
          ))}
          </IonRow>
    </IonGrid>
    )
}

export default QueueComponent