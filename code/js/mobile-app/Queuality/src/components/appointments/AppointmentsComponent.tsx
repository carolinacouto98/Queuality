/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
import { IonGrid, IonRow, IonCard, IonItem, IonCardTitle, IonCol} from '@ionic/react'
import { AppointmentDetails } from '../../model/AppointmentsModel'


type Props = {
    appointments: AppointmentDetails[]
}
const AppointmentsComponent : React.FC<Props> = (props) => {
    return(
        props.appointments.length?
            <AppointmentsDisplay appointments={props.appointments}/>
            :
            <NoAppointmentsDisplay />
    )
}

export default AppointmentsComponent

const AppointmentsDisplay : React.FC<Props> = (props) => {
    return(
        <IonGrid>
            <IonRow>
                {props.appointments.map((appt: AppointmentDetails) => ( 
                    <IonCard routerLink={`/appointments/${appt._id}`} key={appt._id}>
                        <IonItem>
                            <IonCardTitle>{appt.subject}</IonCardTitle>
                            <IonCardTitle slot='end' style={{marginTop:'5%', marginBottom:'5%'}}>{timestampToDate(appt.date)}</IonCardTitle>    
                        </IonItem>  
                    </IonCard>   
                ))}  
            </IonRow> 
        </IonGrid>
    )
}

const NoAppointmentsDisplay : React.FC = () => {
    return(
        <IonGrid style={{'marginTop':'65%'}}>
            <IonRow>
                <IonCol class='ion-text-center'>
                    <h2>You Have No Appointments!</h2>
                </IonCol>
            </IonRow>
            <IonRow>
                <IonCol class='ion-text-center'>
                    <b>Click on the button in the toolbar to add one</b>
                </IonCol> 
            </IonRow>
        </IonGrid>
    )
}

function timestampToDate(timestamp: string){
    const dateObj= new Date(timestamp)
    const minutes = (dateObj.getMinutes()< 10? '0': '' )+ dateObj.getMinutes()
    return dateObj.getDate()+'/'+(dateObj.getMonth()+1)+ '/' + dateObj.getFullYear() + ' ' + dateObj.getHours()+ ':' + minutes

}