import * as Siren from '../common/Siren'
import * as Model from '../model/AppointmentsModel'
import {NGROK_PATH, API_BASE_URL} from '../App'

export interface AppointmentsService {
    addAppointment: (date: string, section: string, subject: string) => Promise<Siren.Entity<Model.AppointmentDetails, void>>,
    getAppointment:(section: string, apptId: string) => Promise<Siren.Entity<Model.AppointmentDetails, void>>,
    removeAppointment: (apptId: string) => Promise<Siren.Entity<void, void>>,
    getAvailableHours: (section: string, subject: string, day: string) => Promise<Siren.Entity<Array<string>, void>>,
    getNextAvailableDay: (section: string, subject: string) => Promise<Siren.Entity<string, void>>
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
        removeAppointment: ( apptId: string) : Promise<Siren.Entity<void, void>> =>  
            fetch(`${NGROK_PATH}${API_BASE_URL}/appointments/${apptId}`,{
                method: 'DELETE',
            })
                .then(res => res.json()),
        getAvailableHours: (section: string, subject: string, day: string): Promise<Siren.Entity<Array<string>, void>> =>
            fetch(`${NGROK_PATH}${API_BASE_URL}/sections/${section}/availableHours?subject=${subject}&day=${day}`, {
                headers: headers
            })
                .then(res =>  res.json()),
        getNextAvailableDay: (section: string, subject: string): Promise<Siren.Entity<string, void>> =>
            fetch(`${NGROK_PATH}${API_BASE_URL}/sections/${section}/nextAvailableDay?subject=${subject}`, {
                headers: headers
            })
                .then(res => res.json())
    }
}