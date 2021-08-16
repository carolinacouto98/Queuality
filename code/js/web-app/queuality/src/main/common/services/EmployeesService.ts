import * as Model from '../model/EmployeeModel'
import * as Fetch from '../FetchUtils'
import * as Siren from '../Siren'

import { API_BASE_URL } from '../../App'

export interface EmployeesService {
    getEmployees: () => Fetch.Request<Siren.Entity<void, Model.Employee>>
    getEmployee: (employeeId: string) => Fetch.Request<Siren.Entity<Model.Employee, void>>
    //addSection: (section: Model.Employee) => Fetch.Request<Siren.Entity<Model.Employee, void>>
    updateEmployee: (employee: Model.Employee) => Fetch.Request<Siren.Entity<Model.Employee, void>>
    deleteEmployee: (employeeId: string) => Fetch.Request<Siren.Entity<void, void>>
}

export function getEmployeesService() : EmployeesService {
    const headers = new Headers({})
    headers.append('Content-type', 'application/json')
    headers.append('Accept', 'application/json')
    return { 
        getEmployees: (): Fetch.Request<Siren.Entity<void, Model.Employee>> =>
            Fetch.cancelableRequest(new URL(`${API_BASE_URL}/api/employees`), {headers: headers})
        ,
        getEmployee: (employeeId: string): Fetch.Request<Siren.Entity<Model.Employee, void>> =>
            Fetch.cancelableRequest(new URL(`${API_BASE_URL}/api/employees/${employeeId}`))
        ,
        updateEmployee: (employee: Model.Employee): Fetch.Request<Siren.Entity<Model.Employee, void>> => 
            Fetch.cancelableRequest(new URL(`${API_BASE_URL}/api/employees/${employee._id}`), { 
                method: 'PATCH',
                headers: headers,
                body: JSON.stringify(employee)
            })
        ,
        deleteEmployee: (employeeId: string): Fetch.Request<Siren.Entity<void, void>> => 
            Fetch.cancelableRequest(new URL(`${API_BASE_URL}/api/employees/${employeeId}`), { 
                method: 'DELETE',
                headers: headers
            })
    }
}