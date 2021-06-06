import { IonContent,IonFooter,IonIcon,IonItem,IonPage, IonToolbar } from '@ionic/react'
import React, { useContext, useEffect, useState } from 'react'
import QueueComponent from '../components/queues/QueueComponent'
import { Queue } from '../model/QueuesModel'
import { accessibilityOutline } from 'ionicons/icons'
import { AppContext } from '../App'

const Queues: React.FC = () => {
    const context = useContext(AppContext)
    const [queues, setQueues] = useState<Queue[]>([])
    
    useEffect( () => {
        context.queueService.getQueues()
            .then(data => setQueues(data))
    },[setQueues, queues, context])

    return (
        <IonPage>
            <IonContent>
                <QueueComponent  queues={queues} /> 
            </IonContent>
            <IonFooter>
                <IonToolbar className='ion-no-border'>
                    <IonItem lines='none'>
                        <IonIcon icon={accessibilityOutline} size='small'/> 
                        -{'>'} Priority Queue
                    </IonItem>  
                </IonToolbar>
            </IonFooter>
        </IonPage>
    )
}

export default Queues