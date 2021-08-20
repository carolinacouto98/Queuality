
import { Card, Container, Header, Icon, Image, Popup, Segment } from 'semantic-ui-react'
import { Employee } from '../../../common/model/EmployeeModel'
import * as Siren from '../../../common/Siren'
import { Action } from '../../../common/Siren'
import DropDownRoles from './DropDownRoles'
import EmployeeCard from './EmployeeCard'

type EmployeesListProps = {
    employees? : Employee[],
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
    console.log(props.employees)
    return <Container>
        {props.employees?.map(employee => 
            <Card fluid>
                <Card.Content textAlign='left'>
                    <Header floated='left'>
                    <Popup
                        trigger={
                            employee.picture ?
                            <Image size='tiny' src={employee.picture}/> : 
                            <Icon size='huge' name='user circle'/>
                        }
                        on='click'
                        hideOnScroll
                    >
                        <EmployeeCard 
                            employee={employee}
                            update={canRemove || canChangeRoles}
                            remove={canRemove}
                            handleUpdateEmployee={props.handleUpdateEmployee}
                            handleDeleteEmployee={props.handleDeleteEmployee}
                        />
                    </Popup>
                    </Header>
                    <Card.Header>{employee.name}</Card.Header>
                    <Card.Description hidden={!canChangeRoles}>
                        <DropDownRoles roles={roles} employee={employee} handleUpdateEmployee={props.handleUpdateEmployee}/>
                    </Card.Description>
                </Card.Content>
            </Card>
        )}
    </Container>
}