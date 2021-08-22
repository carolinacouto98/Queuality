import { useEffect, useState } from 'react';
import { EmployeesService } from '../../common/services/EmployeesService';
import * as Siren from '../../common/Siren'
import * as Model from '../../common/model/EmployeeModel'
import * as SectionModel from '../../common/model/SectionModel'
import * as API from '../../common/FetchUtils'
import EmployeesList from './components/EmployeesList';
import { SectionsService } from '../../common/services/SectionsService';


type EmployeeInfo = API.FetchInfo<Siren.Entity<void, Model.Employee>>
type SectionInfo = API.FetchInfo<Siren.Entity<void, SectionModel.Section>>
type EmployeesPageProps = {
    service: EmployeesService,
    sectionsService: SectionsService,
}

function getEmployees(employees? : EmployeeInfo) {
    return employees?.result?.body?.entities.map(entity => entity?.properties!!)
}

function getSections(sections? : SectionInfo) {
    return sections?.result?.body?.entities.map(entity => entity?.properties!!._id!!)
}

function getActions(employees? : EmployeeInfo) {
    return employees?.result?.body?.actions
}

export default function EmployeesPage(props: EmployeesPageProps) {
    const [employees, setEmployees] = useState<EmployeeInfo>()
    const [sections, setSections] = useState<SectionInfo>()
    const [deleted, setDeleted] = useState<boolean>(false)

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
    }, [props.service, deleted])

    useEffect(() => {
        async function sendSectionsRequest(request: API.Request<Siren.Entity<void, SectionModel.Section>>) {
            try {
                setSections({ status: API.FetchState.NOT_READY })
                const result : API.Result<Siren.Entity<void, SectionModel.Section>> = await request.send()
                if (!result.header.ok) 
                    return
                    setSections({ 
                    status : result.header.ok && result.body ? API.FetchState.SUCCESS : API.FetchState.ERROR,
                    result
                })
            } catch (reason) {
                if(reason.name !== 'AbortError')
                setSections({status: API.FetchState.ERROR})
            }
        }
        sendSectionsRequest(props.sectionsService.getSections())
    }, [props.sectionsService])
    
    const employeesList = getEmployees(employees)
    const sectionsList = getSections(sections)
    const actions = getActions(employees)

    async function handleUpdateEmployee(employee : Model.Employee) {
        const result = await props.service.updateEmployee(employee).send()
        if (!result.header.ok)
            setEmployees({status: API.FetchState.ERROR})
    }
    async function handleDeleteEmployee(employeeId : string) {
        const result = await props.service.deleteEmployee(employeeId).send()
        setDeleted(!deleted)
        if (!result.header.ok)
            setEmployees({status: API.FetchState.ERROR})
    }

    return (
        <>
            <EmployeesList 
                employees={employeesList}
                sections={sectionsList || []}
                actions={actions}
                handleUpdateEmployee={handleUpdateEmployee}
                handleDeleteEmployee={handleDeleteEmployee}
            />
        </>
    )
}
