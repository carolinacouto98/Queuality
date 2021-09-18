/* eslint-disable react/prop-types */
import { IonCol, IonGrid, IonRow, IonText } from '@ionic/react'
import React from 'react'
import SubjectCard from './SubjectCard'
import { Subject } from '../../model/SubjectModel'

type Props = {
    subjects: Array<Subject>,
    ticketHandler (subjectName: string): void
}

const SubjectComponent: React.FC <Props> = ({subjects, ticketHandler}) => { 
    return (  
        <IonGrid>
            <IonRow>
                <IonCol style={{marginLeft: '10%'}}>
                    <IonText color='primary'>Subject</IonText>
                </IonCol>
                <IonCol style={{marginLeft: '10%'}}>
                    <IonText color='primary'>Ticket</IonText>
                </IonCol>
                <IonCol>
                    <IonText color='primary'>Desk</IonText>
                </IonCol>
            </IonRow>
            {subjects.map((subject: Subject) => (
                <IonRow key={subject.name}>
                    <SubjectCard subject={subject} ticketHandler={ticketHandler} />
                </IonRow>
            ))}
        </IonGrid>
    )
}

export default SubjectComponent