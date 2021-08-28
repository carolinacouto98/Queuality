/* eslint-disable @typescript-eslint/no-extra-non-null-assertion */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
import { IonButton, IonButtons, IonContent, IonDatetime, IonHeader, IonItem, IonLabel, IonPage, IonSelect, IonSelectOption, IonTitle, IonToolbar} from '@ionic/react'
import React, { useContext, useEffect, useState} from 'react'
import { RouteComponentProps } from 'react-router'
import { AppContext } from '../App'
import * as Siren from '../common/Siren'
import * as SectionsModel from '../model/SectionsModel'
import * as SubjectsModel from '../model/SubjectModel'
import { setAppointment } from '../services/AppointmentsStorage'

type SectionsInfo = Siren.Entity<void, SectionsModel.Section>
type SubjectsInfo = Siren.Entity<void, SubjectsModel.Subject> 

const AddAppointment: React.FC<RouteComponentProps> = ({history}) => {
    const context = useContext(AppContext)
    const [sectionsInfo, setSections ] = useState<SectionsInfo>()
    const [subjectsInfo, setSubjects ] = useState<SubjectsInfo>()
    const [section, setSection] = useState<string>()
    const [subject, setSubject] = useState<string>()
    const [selectedDate, setSelectedDate] = useState<string>('')
    const [selectedHour, setSelectedHour] = useState<string>('')
    useEffect(() => {
        async function sendSectionsRequest() {
            try {
                context.sectionService.getSections()
                    .then(result =>
                        setSections(result)
                    ) 
            }
            catch(reason) {
                return
            }
        }
        sendSectionsRequest()
    },[context.sectionService])

    const sections = getSectionsValue(sectionsInfo) 
    useEffect(() => {
        async function sendSubjectsRequest() {
            try {
                context.subjectService.getSubjects(section!!)
                    .then(result =>
                        setSubjects(result)
                    )
            }
            catch(reason) {
                return
            }
        }
        if(section)
            sendSubjectsRequest()
    }, [section, context.subjectService])

    const subjects = getSubjectsValue(subjectsInfo)

    function addApointmentHandler() {
        const dateObj = new Date(selectedDate)
        const day = dateObj.getDate()
        const month = dateObj.getMonth()+1
        const year = dateObj.getFullYear()
        const hoursObj = new Date(selectedHour)
        const hours = hoursObj.getHours()
        const minutes= hoursObj.getMinutes()
        const date =month+'/'+day+'/' +year+ ' '+ hours + ':' + (minutes<10 ? '0'+minutes: minutes)
        context.appointmentService.addAppointment(date, section!!, subject!!)
            .then(result => 
                setAppointment(result.properties!!)
            ) 
        history.push('/appointments')
    }
    return ( 
        <IonPage>
            <IonHeader translucent>
                <IonToolbar>
                    <IonTitle>Make an Appointment</IonTitle>
                    <IonButtons slot='end'>
                        <IonButton routerLink='/appointments'>Close</IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            {sections?
                <IonContent>
                    <IonItem>
                        <IonLabel>Choose Section</IonLabel>
                        <IonSelect value={section} placeholder="Select One" onIonChange={e => setSection(e.detail.value)}>
                            {sections.map(sect => {
                                return(
                                    <IonSelectOption key={sect._id} value={sect._id}>{sect._id}</IonSelectOption>
                                )
                            })}
                        </IonSelect>
                    </IonItem>
                    {subjects?
                        <>
                            <IonItem>
                                <IonLabel>Choose Subject</IonLabel>
                                <IonSelect value={subject} placeholder="Select One" onIonChange={e => setSubject(e.detail.value)}>
                                    {subjects.map(sub => {
                                        return(
                                            sub.priority?
                                                null:
                                                <IonSelectOption key={sub.description} value={sub.description}>{sub.description}</IonSelectOption>
                                        )
                                    })}
                                </IonSelect>
                            </IonItem>
                            <IonItem>
                                <IonLabel>Select a Date</IonLabel>
                                <IonDatetime pickerFormat='DD MMMM YYYY' placeholder='Select Date' min={new Date().toISOString()} value={selectedDate} onIonChange={e => setSelectedDate(e.detail.value!)}></IonDatetime>
                            </IonItem>
                            <IonItem>
                                <IonLabel>Select an Hour</IonLabel>
                                <IonDatetime displayFormat='HH:mm' minuteValues={getMinuteValues(sections.find(sect=> sect._id=== section)!!)} placeholder='Select Hour' min={hoursConverter(sections.find(sect => sect._id=== section)?.workingHours.begin!!)} max={hoursConverter(sections.find(sect => sect._id=== section)?.workingHours.end!!)} value={selectedHour} onIonChange={e => setSelectedHour(e.detail.value!)}></IonDatetime>
                            </IonItem>
                            <IonButton onClick={() => addApointmentHandler()}>Submit</IonButton>
                        </>
                        : null
                    }
                </IonContent> 
                : null
            }
        </IonPage>
    )
}

export default AddAppointment

function getSectionsValue(sectionsInfo?: SectionsInfo): Array<SectionsModel.Section>| undefined {
    return sectionsInfo && sectionsInfo.entities!!.map(entity => entity.properties!!)
}

function getSubjectsValue(subjectsInfo? : SubjectsInfo) : SubjectsModel.Subject[] | undefined {
    return subjectsInfo?.entities?.map(entity => entity.properties!!)
}

function getMinuteValues(section: SectionsModel.Section): string{
    let minutes ='0,'
    let i = section.workingHours.duration
    while(i< 60) {
        minutes = minutes + i+','
        i= i + section.workingHours.duration
    }
    return minutes.trimEnd()
}

function hoursConverter(hours: string): string {
    const arr = hours.split(':')
    const hour = arr[0]
    const minutes = arr[1]
    const res = (+hour<10? '0'+ hour : hour) + ':'+ (+minutes<10? '0'+ minutes: minutes)
    return res
}