import * as Siren from '../common/Siren'
import * as Model from '../model/AppointmentsModel'
import {NGROK_PATH, API_BASE_URL} from '../App'

export interface AppointmentsService {
    addAppointment: (date: string, section: string, subject: string) => Promise<Siren.Entity<Model.AppointmentDetails, void>>,
    getAppointment:(section: string, apptId: string) => Promise<Siren.Entity<Model.AppointmentDetails, void>>,
    removeAppointment: (section: string, apptId: string) => Promise<Siren.Entity<void, void>>
}

export function getAppointmentService(): AppointmentsService {
    const headers = new Headers({})
    headers.append('Accept', 'application/json')
    headers.append('Content-type', 'application/json')
    return {
        addAppointment: (date: string, section: string, subject: string): Promise<Siren.Entity<Model.AppointmentDetails, void>> => 
            fetch(`${NGROK_PATH}${API_BASE_URL}/sections/${section}/appointments`,{
                method: 'POST',
                headers: headers,
                body: JSON.stringify({
                    'subject': subject,
                    'date': date
                })
            })
                .then(res => res.json())   
        ,
        getAppointment: (section: string, apptId: string): Promise<Siren.Entity<Model.AppointmentDetails, void>> =>
            fetch(`${NGROK_PATH}${API_BASE_URL}/sections/${section}/appointments/${apptId}`,{
                headers: headers
            })
                .then(res => res.json())
        ,
        removeAppointment: (section: string, apptId: string) : Promise<Siren.Entity<void, void>> =>  
            fetch(`${NGROK_PATH}${API_BASE_URL}/sections/${section}/appointments/${apptId}`,{
                method: 'DELETE',
            })
                .then(res => res.json())
    }
}