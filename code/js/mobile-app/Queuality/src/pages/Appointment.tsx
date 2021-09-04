/* eslint-disable @typescript-eslint/no-extra-non-null-assertion */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
import { IonButton, IonButtons, IonCol, IonContent, IonHeader, IonItem, IonPage, IonTitle, IonToolbar} from '@ionic/react'
import React, { useContext, useEffect, useState } from 'react'
import { RouteComponentProps } from 'react-router'
import { AppContext } from '../App'
import { AppointmentDetails } from '../model/AppointmentsModel'
import * as Siren from '../common/Siren'
import { getAppointmentSection, removeAppointment } from '../services/AppointmentsStorage'

type AppointmentProps = RouteComponentProps<{
    appointment: string,
}>

type AppointmentInfo = Siren.Entity<AppointmentDetails, void>

const Appointment: React.FC<AppointmentProps> = ({match, history}) => {
    const [appointmentInfo, setAppointmentInfo] = useState<AppointmentInfo>()
    const {appointment} = match.params
    const context = useContext(AppContext)
    console.log(appointment)
    useEffect(() => {
        async function sendAppointmentRequest() {  
            getAppointmentSection(appointment)
                .then(section => 
                    context.appointmentService.getAppointment(section, appointment)
                        .then(result =>
                            setAppointmentInfo( result)
                        ))
            
        }
        sendAppointmentRequest()
    }, [appointment, context.appointmentService])
    
    const appointmentDetails = getAppointmentValue(appointmentInfo!!)
    console.log(appointmentDetails)
    return ( 
        appointmentDetails ?
            <IonPage>
                <IonToolbar>
                    <IonTitle>{appointmentDetails.subject}</IonTitle>
                    <IonButtons slot='end'>
                        <IonButton routerLink='/appointments'>Close</IonButton>
                        <IonButton onClick={() => {
                            removeAppointment(appointmentDetails._id)
                            context.appointmentService.removeAppointment(appointmentDetails._id)
                            history.goBack()
                        }} color='danger'>Delete</IonButton>
                    </IonButtons>
                </IonToolbar> 
                <IonContent>
                    <IonItem lines='none'>
                        <IonCol></IonCol>
                        <h3>{appointmentDetails.section}</h3>
                        <IonCol></IonCol>
                    </IonItem>
                    <IonItem  lines='none'>
                        <IonCol></IonCol>
                        <h5>{timestampToDate(appointmentDetails.date)}</h5>
                        <IonCol></IonCol>
                    </IonItem>
                    <IonItem  lines='none'>
                        <IonCol></IonCol>
                        <h5>{appointmentDetails.desk}</h5>
                        <IonCol></IonCol>
                    </IonItem>
                </IonContent> 
            </IonPage>
            : null
    )
}

export default Appointment

function getAppointmentValue( appointmentInfo: AppointmentInfo): AppointmentDetails {
    return appointmentInfo?.properties!!
}

function timestampToDate(timestamp: string){
    const dateObj= new Date(timestamp)
    const minutes = (dateObj.getMinutes()< 10? '0': '' )+ dateObj.getMinutes()
    console.log(minutes)
    return dateObj.getDate()+'/'+(dateObj.getMonth()+1)+ '/' + dateObj.getFullYear() + ' ' + dateObj.getHours()+ ':' + minutes

}