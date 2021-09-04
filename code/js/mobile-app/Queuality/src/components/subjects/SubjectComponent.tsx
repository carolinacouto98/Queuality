/* eslint-disable react/prop-types */
import { IonCol, IonGrid, IonRow } from '@ionic/react'
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
                <IonCol style={{marginLeft: '10%'}}>Subject</IonCol>
                <IonCol style={{marginLeft: '10%'}}>Ticket</IonCol>
                <IonCol>Desk</IonCol>
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