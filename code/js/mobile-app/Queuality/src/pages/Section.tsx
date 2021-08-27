/* eslint-disable react/jsx-no-undef */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-extra-non-null-assertion */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/prop-types */
/*eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain*/
import { IonButton, IonButtons, IonContent,IonFooter,IonHeader,IonIcon,IonItem,IonPage, IonTitle, IonToolbar } from '@ionic/react'
import React, { useContext, useEffect, useState } from 'react'
import SubjectComponent from '../components/subjects/SubjectComponent'
import * as Model from '../model/SubjectModel'
import * as Siren from '../common/Siren' 
import { accessibilityOutline } from 'ionicons/icons'
import { AppContext } from '../App'
import { RouteComponentProps } from 'react-router'
import { setTicket } from '../services/TicketsStorage'
import { TicketDetails } from '../model/TicketsModel'

type SubjectsInfo = Siren.Entity<void, Model.Subject>

type RouteProps  = RouteComponentProps <{sectionId: string}>


const Section: React.FC<RouteProps>  = ({match}) => {
    const {sectionId} = match.params
    const sectionName = sectionId.replace('-', ' ')
    const [subjectsInfo, setSubjects] = useState<SubjectsInfo>()
    const context = useContext(AppContext)

    function fetchData(){
        return context.subjectService.getSubjects(sectionName)
    }
    useEffect( () => {
        fetchData()
            .then(result => 
                setSubjects(result)
            )  
    },[fetchData, sectionId])
    
    async function addTicketHandler(subjectName: string) {
        const ticket = subjectName+getAddTicketValue(await context.subjectService.addNewTicket(sectionName, subjectName))!!
        const waiting = getQueueIndex(ticket, await context.subjectService.getQueue(sectionName))!!
        const subject = getSubjectValue(subjectName, subjectsInfo)!!
        setTicket(new TicketDetails(ticket, waiting, subject, sectionName))
    }

    const subjects = getSubjectsValue(subjectsInfo)!!

    return (
        subjects && subjects.length?
            <IonPage>
                <IonHeader translucent>
                    <IonToolbar>
                        <IonTitle>{sectionName}</IonTitle>
                        <IonButtons slot='end'>
                            <IonButton routerLink='/sections' >Sections</IonButton>
                        </IonButtons>
                    </IonToolbar>
                </IonHeader>
                <IonContent>
                    <SubjectComponent  subjects={subjects} ticketHandler={addTicketHandler}/> 
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
            : null
    )
}

export default Section

function getAddTicketValue(ticketInfo? : Siren.Entity<string, void>) : string | undefined {
    return ticketInfo?.properties
}

function getSubjectValue(subjectName: string, subjectsInfo? : SubjectsInfo) : Model.Subject | undefined {
    return subjectsInfo?.entities?.find(entity => entity.properties?.name === subjectName)?.properties
}

function getQueueIndex(ticket : string, queueInfo? : Siren.Entity<string[], void>) : number | undefined {
    return queueInfo?.properties?.findIndex(tick => tick === ticket)
}

function getSubjectsValue(subjectsInfo? : SubjectsInfo) : Model.Subject[] | undefined {
    return subjectsInfo?.entities?.map(entity => entity.properties!!)
}