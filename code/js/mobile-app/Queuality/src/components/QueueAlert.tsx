import { Plugins } from "@capacitor/core"
import { IonAlert } from "@ionic/react"
import React, { useEffect, useState } from "react"

interface QueueAlertProps{
    alert: string|undefined,
    queueName: string
}

interface Ticket{
    ticket: string
}

const [ticket, setTicket] = useState<Ticket>()

function getTicket(queueName: string){
    const { Http } = Plugins
    useEffect( () => {
        async function loadTicket(queueName: string) {
            const path = 'http://localhost:3000/api/tickets'
            await Http.request (
                {
                    method: 'POST',
                    url: path,
                    headers: {
                        'accept' : 'application/json',
                        'content-type': 'application/json',
                    },
                    data: {
                        'queueName': queueName
                    }
                }
            )
                .then(res => res.data)
                .then(data => setTicket(data.properties))
                .catch(e => console.log(e))
        }
        loadTicket(queueName)
        })

}

export function getCurrentTicket(){
    return ticket
}

export const  QueueAlert: React.FC<QueueAlertProps> = props => {
    
    return (
        <IonAlert
            isOpen={!!props.alert}
            message={props.alert}
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
                                getTicket(props.queueName)
                              }
                            }
                          ]}
                    />    
                
    )
} 
