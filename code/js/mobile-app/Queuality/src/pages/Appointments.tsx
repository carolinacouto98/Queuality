/*eslint-disable react/react-in-jsx-scope */
import { IonButton, IonButtons, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, useIonViewWillEnter } from '@ionic/react'
import { useState } from 'react'
import AppointmentsComponent from '../components/appointments/AppointmentsComponent'
import { AppointmentDetails } from '../model/AppointmentsModel'
import { getAppointments, removeAppointment} from '../services/AppointmentsStorage'

const Appointments: React.FC = () => {
    const [appointments, setAppointments] = useState<AppointmentDetails[]>([])
    useIonViewWillEnter(() => {
        async function loadAppointments() {
            const appointments = await getAppointments()
            if(appointments) {
                appointments.map(async appointment => {
                    if(new Date(appointment.date).getTime()< new Date().getTime())
                        await removeAppointment(appointment._id)
                   
                })
                await getAppointments().then(appointments => setAppointments(appointments))
            }
            
        } 
        loadAppointments() 
    })
    return ( 
        <IonPage>
            <IonHeader translucent>
                <IonToolbar>
                    <IonTitle>My Appointments</IonTitle>
                    <IonButtons slot='end'>
                        <IonButton routerLink='/add-appointment'>Add Appointment</IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                {appointments?
                    <AppointmentsComponent appointments={appointments}/>  
                    :null}
            </IonContent>
        </IonPage>
    )
}

export default Appointments