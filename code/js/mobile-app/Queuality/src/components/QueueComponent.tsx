import { IonBadge, IonAlert, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCol, IonGrid, IonRow } from '@ionic/react';
import React, { useState, useEffect} from 'react'

import '@capacitor-community/http';

import { Plugins } from '@capacitor/core';
const QueueComponent: React.FC = () => {
    const [queues, setQueues] = useState([])
    const [alert, setAlert] = useState<string>()
  
    useEffect( () => {
        const { Http } = Plugins
            const path = 'http://localhost:3000/api/queues/'
            Http.request(
                {
                    method: 'GET',
                    url: path,
                    headers:{
                        'accept' : 'application/json',
                        'content-type': 'application/json',
                    }
            })
                .then(res => res.data)
                .then(data => setQueues(data.properties))
                .catch(e => console.log(e))
        })

        /*const getTicket = (queueId: string) => useEffect(() => {
            const path = `http://localhost:3000/api/tickets/${queueId}`
            fetch(path,
                {'method' :'POST',
                    'headers': {
                        'accept' : 'application/json',
                        'content-type': 'application/json',
                    }
            })
                .then(res => res.json())
               
                .catch(e => console.log(e))
        })*/

    return (  
     <IonGrid>
         <IonRow>
        {queues!.map((queue: {_id: string, name: string, subject: string, priority: boolean, current: number}) => (
            <IonCol key={queue._id}>
                <IonCard id ={queue._id} button onClick={() => {
                    setAlert(`Are you sure you want to get a ticket from ${queue.name}?`)}}>
                    <IonCardHeader>
                        <IonCardTitle>
                             {queue.name}
                        </IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent>
                        {queue.subject}
                        <IonBadge>{queue.current}</IonBadge>
                    </IonCardContent> 
                    <IonAlert
                        isOpen={!!alert}
                        message={alert}
                        buttons={[
                            {
                              text: 'Cancel',
                              role: 'cancel',
                              cssClass: 'secondary',
                              handler: ()=> {}
                            },
                            {
                              text: 'Okay',
                              handler: () => {
                                //getTicket(queue.id)
                              }
                            }
                          ]}
                    />    
                </IonCard>
            </IonCol>
          ))}
          </IonRow>
    </IonGrid>
    )
}

export default QueueComponent