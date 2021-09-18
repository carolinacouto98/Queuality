import { useState } from "react"
import { Card, Header, Popup, Image, Icon } from "semantic-ui-react"
import DeleteModal from "../../../common/components/DeleteModal"
import { Employee } from "../../../common/model/EmployeeModel"
import DropDown from "./DropDown"
import EmployeeCard from "./EmployeeCard"

type EmployeeItemProps = {
    employee: Employee,
    sections: string[],
    canRemove: boolean,
    canChangeRoles: boolean,
    handleUpdateEmployee: (e: Employee) => void,
    handleDeleteEmployee: (e: string) => void,
}

export default function EmployeeItem(props: EmployeeItemProps) {
    const [openModal, setOpenModal] = useState<boolean>(false)
    const [openPopup, setOpenPopup] = useState<boolean>(false)

    return <Card fluid>
        <Card.Content textAlign='left'>
            <Header floated='left'>
            <Popup
                trigger={
                    props.employee.picture ?
                    <Image size='tiny' src={props.employee.picture} link/> : 
                    <Icon size='huge' name='user circle' link/>
                }
                open={openPopup && !openModal}
                onOpen={() => setOpenPopup(true)}
                onClose={() => setOpenPopup(false)}
                on='click'
                hideOnScroll
            >
                <EmployeeCard 
                    employee={props.employee}
                    sections={props.sections}
                    update={props.canRemove || props.canChangeRoles}
                    remove={props.canRemove}
                    setOpenModal={setOpenModal}
                    handleUpdateEmployee={props.handleUpdateEmployee}
                    handleDeleteEmployee={props.handleDeleteEmployee}
                />
            </Popup>
            <DeleteModal 
                    title='Delete Employee'
                    content={`Are you sure you want to delete employee ${props.employee.name}`}
                    onConfirm={() => props.handleDeleteEmployee(props.employee._id)}
                    onClose={() => {
                        setOpenModal(false)
                    }}
                    open={openModal}
                />
            </Header>
            <Card.Header>{props.employee.name}</Card.Header>
        </Card.Content>
    </Card>
}