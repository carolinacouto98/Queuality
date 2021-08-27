/* eslint-disable @typescript-eslint/no-extra-non-null-assertion */
import { Storage } from '@ionic/storage'
import { AppointmentDetails } from '../model/AppointmentsModel'
const store = new Storage()
store.create()
const KEY = 'appointments'
export async function setAppointment(appt: AppointmentDetails): Promise<void> {
    const appointnments: AppointmentDetails[] = await store.get(KEY)
    if(appointnments) {
        appointnments.push(appt)
        await store.set(KEY,appointnments)
    } else 
        await store.set(KEY,[appt])
}

export async function getAppointments(): Promise<AppointmentDetails[]> {
    return await store.get(KEY)
}

export async function getAppointmentSection(appt: string): Promise<string> {
    return await store.get(KEY).then(appts => 
        appts.find((appointment: AppointmentDetails )=> appointment._id === appt))
        .then((appt: AppointmentDetails )=> appt.section)
}

export async function removeAppointment(apptId: string): Promise<void> {
    const oldAppts: AppointmentDetails[] = await store.get(KEY)
    const newAppts = oldAppts.filter(appt => appt._id!== apptId)
    await store.set(KEY, newAppts)
}