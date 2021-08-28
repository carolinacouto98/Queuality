import { useRef, useState } from "react";
import { Card, Image, Icon, Button } from "semantic-ui-react";
import { Employee } from "../../../common/model/EmployeeModel";
import DropDown from "./DropDown";

type EmployeeCardProps = {
    employee: Employee,
    sections?: string[],
    update: boolean,
    remove: boolean,
    setOpenModal: (open: boolean) => void,
    handleUpdateEmployee: (employee: Employee) => void,
    handleDeleteEmployee: (employeeId: string) => void,
}
export default function EmployeeCard (props: EmployeeCardProps) {
    const [update, setUpdate] = useState<boolean>(false)
    const [sections, setSections] = useState<string[]>(props.employee.sections)
    const deskRef = useRef<HTMLInputElement>(null)
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
                            props.employee.sections = sections
                            props.employee.desk = deskRef.current?.value!!
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