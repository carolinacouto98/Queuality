import { Container } from 'semantic-ui-react'
import { Employee } from '../../../common/model/EmployeeModel'
import { Action } from '../../../common/Siren'
import EmployeeItem from './EmployeeItem'

type EmployeesListProps = {
    employees? : Employee[],
    sections : string[],
    actions? : Action[],
    handleUpdateEmployee : (employee: Employee) => void,
    handleDeleteEmployee : (employeeId: string) => void,
}

const roles = [
    'Manage Sections',
    'Manage Section',
    'Manage Employees',
    'Manage Section\'s Employees Roles',
    'Manage Section\'s Appointments',
    'Manage Employee\'s Appointments',
    'Manage Desk\'s Subject',
    'Answer Appointments',
    'Answer Tickets'
]

export default function EmployeesList(props: EmployeesListProps) {
    
    const canRemove = true// props.actions?.find(action => action.name === 'Manage Employees') !== null
    const canChangeRoles = true //canRemove || props.actions?.find(action => action.name === 'Manage Section\'s Employees Roles') !== null
    
    return <Container>
        {props.employees?.map(employee => 
            <EmployeeItem
                employee={employee}
                sections={props.sections}
                canRemove={canRemove}
                canChangeRoles={canChangeRoles}
                handleUpdateEmployee={props.handleUpdateEmployee}
                handleDeleteEmployee={props.handleDeleteEmployee}
            />
        )}
    </Container>
}