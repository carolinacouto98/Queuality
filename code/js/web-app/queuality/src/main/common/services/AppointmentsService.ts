import { API_BASE_URL } from '../../App'
import { Appointment } from '../model/AppointmentModel'
import * as Siren from './../Siren'
import * as Fetch  from './../FetchUtils'

export interface AppointmentsService {
    getAppointments: (sectionId: string, subject: string, desk: string) => Fetch.Request<Siren.Entity<void, Appointment>>
    updateAppointment: (appointmentId: string, date: Date) => Fetch.Request<Siren.Entity<Appointment, void>>
    deleteAppointment: (appointmentId: string) => Fetch.Request<Siren.Entity<void, void>>
}

export function getAppointmentsService(): AppointmentsService {
    const headers = new Headers({})
    headers.append('Content-type', 'application/json')
    headers.append('Accept', 'application/json')
    return {
        getAppointments: (sectionId: string, subject: string, desk: string): Fetch.Request<Siren.Entity<void, Appointment>> => 
            Fetch.cancelableRequest(new URL(`${API_BASE_URL}/api/sections/${sectionId}/appointments?subject=${subject}&desk=${desk}`), {headers: headers,
                credentials:'include'})         
        ,

        updateAppointment: (appointmentId: string, date: Date): Fetch.Request<Siren.Entity<Appointment, void>> =>
            Fetch.cancelableRequest(new URL(`${API_BASE_URL}/api/appointments/${appointmentId}`), { 
                method: 'PATCH',
                headers: headers,
                body: JSON.stringify({
                    date
                }),
                credentials:'include'
            })
        ,
        deleteAppointment: (appointmentId: string): Fetch.Request<Siren.Entity<void, void>> =>
            Fetch.cancelableRequest(new URL(`${API_BASE_URL}/api/appointments/${appointmentId}`),  
            { 
                method: 'DELETE',
                headers: headers,
                credentials:'include'
            })
    }
}