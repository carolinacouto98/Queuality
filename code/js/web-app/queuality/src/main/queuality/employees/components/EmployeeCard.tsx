import { useRef, useState } from "react";
import { Card, Image, Icon, Button } from "semantic-ui-react";
import DeleteModal from "../../../common/components/DeleteModal";
import { Employee } from "../../../common/model/EmployeeModel";

type EmployeeCardProps = {
    employee: Employee,
    update: boolean,
    remove: boolean,
    handleUpdateEmployee: (employee: Employee) => void,
    handleDeleteEmployee: (employeeId: string) => void,
}
export default function EmployeeCard (props: EmployeeCardProps) {
    const [update, setUpdate] = useState<boolean>(false)
    const sectionRef = useRef<HTMLInputElement>(null)
    const deskRef = useRef<HTMLInputElement>(null)
    const roles = props.employee.roles.toString()
    return (
        <Card>
            {
                props.employee.picture ?
                <Image centered src={props.employee.picture} wrapped/> :
                <Icon fitted size='massive' name='user' wrapped/>
            }
            <Card.Content>
                <Card.Header>{props.employee.name}</Card.Header>
                <Card.Meta>
                    <p>
                        Section: {update 
                            ? <div className='ui input'><input ref={sectionRef} defaultValue={props.employee.section}/></div> 
                            : props.employee.section
                        }
                    </p>
                    <p>
                        Desk: {update 
                            ? <div className='ui input'><input ref={deskRef} defaultValue={props.employee.desk}/></div> 
                            : props.employee.desk
                        }
                    </p>
                </Card.Meta>
                <Card.Description>
                    <p>Roles: {roles}</p>
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
                            props.employee.section = sectionRef.current?.value!!
                            props.employee.desk = deskRef.current?.value!!
                            props.handleUpdateEmployee(props.employee)
                        }
                        setUpdate(!update)
                    }}
                />
                <DeleteModal 
                    title="Delete Employee"
                    content={`Are you sure you want to delete employee ${props.employee.name}`}
                    onConfirm={() => props.handleDeleteEmployee(props.employee._id)}
                    trigger={<Button color='red' content='Remove' icon='close' hidden={!props.remove}/>}
                />
            </Card.Content>
        </Card>
    )
}