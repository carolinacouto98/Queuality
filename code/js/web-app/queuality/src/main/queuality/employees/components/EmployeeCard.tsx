import { useState } from 'react'
import { Card, Image, Icon, Button } from 'semantic-ui-react'
import { Employee } from '../../../common/model/EmployeeModel'
import DropDown from './DropDown'

type EmployeeCardProps = {
    employee: Employee,
    sections?: string[],
    update: boolean,
    remove: boolean,
    setOpenModal: (open: boolean) => void,
    handleUpdateEmployee: (employee: Employee) => void,
    handleDeleteEmployee: (employeeId: string) => void,
}


const rolesArray = [
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

export default function EmployeeCard (props: EmployeeCardProps) {
    const [update, setUpdate] = useState<boolean>(false)
    const [sections, setSections] = useState<string[]>(props.employee.sections)
    const roles = props.employee.roles.toString()
    return (
        <Card>
            {
                props.employee.picture ?
                <Image centered src={props.employee.picture} wrapped/> :
                <Icon fitted size='massive' name='user'/>
            }
            <Card.Content>
                <Card.Header>{props.employee.name}</Card.Header>
                <Card.Meta>
                    <p>
                        Section: {
                            update 
                            ? <DropDown 
                                property='sections' 
                                values={props.sections || []}  
                                employee={props.employee} 
                                onChange={setSections}
                                fluid
                            />
                            : props.employee.sections.toString()
                        }
                    </p>
                </Card.Meta>
                <Card.Description>
                    <p>Roles: {
                        update 
                        ? <DropDown 
                            values={rolesArray} 
                            employee={props.employee} 
                            onChange={roles => { 
                                props.employee.roles = roles
                                props.handleUpdateEmployee(props.employee)
                            }} 
                            property='roles'
                        /> : roles}
                    </p>
                    <Icon name='mail'/>
                    <a href={`mailto:${props.employee._id}`}>{props.employee._id}</a>    
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Button 
                    content='Update'
                    hidden={!props.update}
                    onClick={() => {
                        if (update) {
                            props.employee.sections = sections
                            props.handleUpdateEmployee(props.employee)
                        }
                        setUpdate(!update)
                    }}
                />
                <Button 
                    color='red'
                    content='Remove' 
                    icon='close'
                    hidden={!props.remove}
                    onClick={() => props.setOpenModal(true)}
                />
            </Card.Content>
        </Card>
    )
}