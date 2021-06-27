/* eslint-disable react/jsx-no-undef */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-extra-non-null-assertion */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/prop-types */
import { IonButton, IonButtons, IonContent,IonFooter,IonHeader,IonIcon,IonItem,IonPage, IonTitle, IonToolbar } from '@ionic/react'
import React, { useContext, useEffect, useState } from 'react'
import SubjectComponent from '../components/subjects/SubjectComponent'
import * as Model from '../model/SubjectModel'
import * as API from '../common/FetchUtils' 
import * as Siren from '../common/Siren' 
import { accessibilityOutline } from 'ionicons/icons'
import { AppContext } from '../App'
import { RouteComponentProps } from 'react-router'
import { setTicket } from '../services/TicketsStorage'
import { TicketDetails } from '../model/TicketsModel'

type SubjectsRequest = API.Request<Siren.Entity<Model.SubjectsDto, Model.Subject>> 
type SubjectsInfo = API.FetchInfo<Siren.Entity<Model.SubjectsDto, Model.Subject>> 


type Props = RouteComponentProps<{
    sectionName: string
}>
const Section: React.FC<Props> = ({match, history}) => {
    const {sectionName} = match.params
    const service = useContext(AppContext).subjectService
    const [subjectsInfo, setSubjects ] = useState<SubjectsInfo>()
    useEffect( () => {
        async function sendSubjectsRequest(request: SubjectsRequest) {
            try {
                setSubjects({ status: API.FetchState.NOT_READY })
                const result: API.Result<Siren.Entity<Model.SubjectsDto,Model.Subject>> = await request.send()
                setSubjects({ 
                    status: result.header.ok && result.body ? API.FetchState.SUCCESS : API.FetchState.ERROR,
                    result
                })
            }
            catch(reason) {
                if(reason.name !== 'AbortError')
                    setSubjects({ status: API.FetchState.ERROR })
            }
        }
        sendSubjectsRequest(service.getSubjects(sectionName))
    
    },[service])
    
    async function addTicketHandler(subjectName: string) {
        const ticket = getAddTicketValue(await service.addNewTicket(sectionName, subjectName).send())!!
        const waiting = getQueueLength(await service.getQueue(sectionName).send())!!
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

function getAddTicketValue(ticketInfo? : API.Result<Siren.Entity<string, void>>) : string | undefined {
    return ticketInfo?.body?.properties
}

function getSubjectValue(subjectName: string, subjectsInfo? : SubjectsInfo) : Model.Subject | undefined {
    return subjectsInfo?.result?.body?.entities?.find(entity => entity.properties?.name === subjectName)?.properties
}

function getQueueLength(queueInfo? : API.Result<Siren.Entity<string[], void>>) : number | undefined {
    return queueInfo?.body?.properties?.length
}

function getSubjectsValue(subjectsInfo? : SubjectsInfo) : Model.Subject[] | undefined {
    return subjectsInfo?.result?.body?.properties?.subjects
}