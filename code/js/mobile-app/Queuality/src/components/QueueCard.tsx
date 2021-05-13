import { Plugins } from "@capacitor/core"
import {IonCard, IonCardContent, IonCardHeader, IonCardTitle, useIonAlert } from "@ionic/react"
import React, { Fragment, useEffect, useState } from "react"
import QueueBadge from "./QueueBadge"


interface QueueCardProps{
    id: string,
    name: string,
    subject: string,
    priority: boolean
}
export let currentTicket: string

const QueueCard: React.FC<QueueCardProps> = props => {
    const [alert] = useIonAlert()
    const [ticket, setTicket] = useState<string>('')
    const { Http } = Plugins

    async function loadTicket() {
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
                    'queueName': props.name,
                    'queueId': props.id
                }
            }
        )
            .then(res => res.data)
            .then(data => setTicket(data.properties))
            .catch(e => console.log(e))
    }


    useEffect( () => {
        loadTicket()
    })
        currentTicket = ticket

    return(
        <Fragment>
        <IonCard id ={props.id} button onClick={() => {
            alert({
                message: `Are you sure you want to get a ticket from ${props.name}?`,
                buttons: [
                    {
                      text: 'Cancel',
                      role: 'cancel',
                      cssClass: 'secondary',
                      handler: ()=> {}
                    },
                    {
                      text: 'Okay',
                      handler: () => {
                        loadTicket()
                      }
                    }
                  ]
            })
            
            }}>
            <IonCardHeader>
                <IonCardTitle>
                     {props.name}
                </IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
                {props.subject}
                <QueueBadge queueId={props.id}/>
            </IonCardContent> 
            </IonCard>
           
        </Fragment>
    )
}

export default QueueCard