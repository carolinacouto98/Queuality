import { useEffect, useState } from 'react';
import { EmployeesService } from '../../common/services/EmployeesService';
import * as Siren from '../../common/Siren'
import * as Model from '../../common/model/EmployeeModel'
import * as API from '../../common/FetchUtils'
import EmployeesList from './components/EmployeesList';


type EmployeeInfo = API.FetchInfo<Siren.Entity<void, Model.Employee>>
type EmployeesPageProps = {
    service: EmployeesService
}

function getEmployees(employees? : EmployeeInfo) {
    return employees?.result?.body?.entities.map(entity => entity?.properties!!)
}

function getActions(employees? : EmployeeInfo) {
    return employees?.result?.body?.actions
}

export default function EmployeesPage(props: EmployeesPageProps) {
    const [employees, setEmployees] = useState<EmployeeInfo>()
    const [updated, setUpdated] = useState<boolean>(false)

    useEffect(() => {
        async function sendEmployeesRequest(request: API.Request<Siren.Entity<void, Model.Employee>>) {
            try {
                setEmployees({ status: API.FetchState.NOT_READY })
                const result : API.Result<Siren.Entity<void, Model.Employee>> = await request.send()
                if (!result.header.ok) 
                    return
                setEmployees({ 
                    status : result.header.ok && result.body ? API.FetchState.SUCCESS : API.FetchState.ERROR,
                    result
                })
            } catch (reason) {
                if(reason.name !== 'AbortError')
                    setEmployees({status: API.FetchState.ERROR})
            }
        }
        sendEmployeesRequest(props.service.getEmployees())
    }, [props.service])
    
    const employeesList = getEmployees(employees)
    const actions = getActions(employees)

    async function handleUpdateEmployee(employee : Model.Employee) {
        console.log(employee)
        const result = await props.service.updateEmployee(employee).send()
        setUpdated(!updated)
        if (!result.header.ok)
            setEmployees({status: API.FetchState.ERROR})
    }
    async function handleDeleteEmployee(employeeId : string) {
        const result = await props.service.deleteEmployee(employeeId).send()
        setUpdated(!updated)
        if (!result.header.ok)
            setEmployees({status: API.FetchState.ERROR})
    }

    return (
        <>
            <EmployeesList 
                employees={employeesList}
                actions={actions}
                handleUpdateEmployee={handleUpdateEmployee}
                handleDeleteEmployee={handleDeleteEmployee}
            />
        </>
    )
}
