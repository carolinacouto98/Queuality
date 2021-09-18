import { useEffect } from "react"
import { useRef, useState } from "react"
import { Link, useHistory, useLocation } from "react-router-dom"
import { Button, Container, Icon, Menu, Message, Modal, Image, Label } from "semantic-ui-react"
import { EmployeesService } from "../../common/services/EmployeesService"
import * as Siren from '../../common/Siren'
import * as Model from '../../common/model/EmployeeModel'
import * as API from '../../common/FetchUtils'

type NavbarProps = {
    fixed?: boolean,
    noMargin?: boolean,
    service: EmployeesService
}

type EmployeeInfo = API.FetchInfo<Siren.Entity<Model.Employee, void>>

export default function Navbar({ service, fixed, noMargin }: NavbarProps) {
    const location = useLocation()
    const [openModal, setOpenModal] = useState<boolean>(false)
    const [openModalTickets, setOpenModalTickets] = useState<boolean>(false)
    const [deskMessage, setDeskMessage] = useState<boolean>(false)
    const [deskMessageTickets, setDeskMessageTickets] = useState<boolean>(false)
    const [subjectMessage, setSubjectMessage] = useState<boolean>(false)
    const [employeeInfo, setEmployee] = useState<EmployeeInfo>()
    const desk = useRef<HTMLInputElement>(null)
    const deskTickets = useRef<HTMLInputElement>(null)
    const subject = useRef<HTMLInputElement>(null)
    const history = useHistory()

    useEffect(() => {
        async function sendEmployeeRequest(request: API.Request<Siren.Entity<Model.Employee, void>>) {
            try {
                setEmployee({ status: API.FetchState.NOT_READY })
                const result : API.Result<Siren.Entity<Model.Employee, void>> = await request.send()
                if (!result.header.ok)
                    return
                setEmployee({
                    status : result.header.ok && result.body ? API.FetchState.SUCCESS : API.FetchState.ERROR,
                    result
                })
            } catch (reason) {
                if(reason.name !== 'AbortError')
                    setEmployee({status: API.FetchState.ERROR})
            }
        }
        sendEmployeeRequest(service.getEmployeeLoggedIn())
    }, [service])


    const employee = employeeInfo?.result?.body?.properties
    return <>
        <Menu
            fixed={fixed ? 'top' : undefined}
            style={{
                backgroundColor:'#33BEFF',
                marginBottom: noMargin ? '0' : undefined
            }}
            borderless
            pointing
            secondary
            textAlign='left'
        >
            <Container>
            <Menu.Item
                active={location.pathname === '/queuality'}
                as={ Link } to='/queuality'
                style={{
                    fontFamily:'Beon',
                    fontWeight: 'bold'
                }}>
                    Queuality
            </Menu.Item>
            <Menu.Item
                active={
                    location.pathname.includes('/queuality/sections')
                    && !location.pathname.includes('/appointments')
                    && !location.pathname.includes('/tickets')
                }
                as={ Link } to='/queuality/sections'>
                    <Icon name='building'/>
                    Sections
            </Menu.Item>
            <Menu.Item
                active={location.pathname === '/queuality/employees'}
                as={ Link } to='/queuality/employees'>
                    <Icon name='users'/>
                    Employees
            </Menu.Item>
            {
                location.pathname.match('/queuality/sections/.*') ?
                <>
                    <Menu.Item
                        active={ location.pathname.includes('/tickets') }
                        onClick={() => setOpenModalTickets(true)}
                        link
                    >
                        <Icon name='ticket'/>
                        Tickets
                    </Menu.Item>
                    <Menu.Item
                        active={ location.pathname.includes('/appointments') }
                        onClick={() => setOpenModal(true)}
                        link
                    >
                        <Icon name='calendar alternate'/>
                        Appointments
                    </Menu.Item>
                </>
                :<></>
            }
            {
                employee ?
                <Menu.Item position='right'>
                    {
                        employee.picture ?
                        <Image src={employee.picture} avatar /> : <Icon name='user circle' />
                    }
                    <span>{employee.name}</span>
                </Menu.Item> :
                <Menu.Item
                    position='right'
                    active={location.pathname === '/queuality/login'}
                    as={ Link } to='/queuality/login'>
                        <Icon name='sign-in'/>
                        Login
                </Menu.Item>
            }
            </Container>
        </Menu>
        <Modal
            open={openModal}
            onOpen={() => setOpenModal(true)}
            onClose={() => setOpenModal(false)}
        >
            <Modal.Header>Appointments</Modal.Header>
            <Modal.Content>
                <label>Subject Name:</label>
                <input style={{margin:'1%'}} ref={subject} type='text' placeholder='Subject Name'/>
                <Message error hidden={!subjectMessage} icon='error'>Subject Name is required</Message>
                <label>Desk:</label>
                <input style={{margin:'1%'}} ref={desk} type='text' placeholder='Desk'/>
                <Message error hidden={!deskMessage} icon='error'>Desk is required</Message>
            </Modal.Content>
            <Modal.Actions>
                <Button content='Cancel' onClick={() => setOpenModal(false)}/>
                <Button content='Ok' onClick={() => {
                    if (!subject.current?.value) setSubjectMessage(true)
                    else setSubjectMessage(false)

                    if (!desk.current?.value) setDeskMessage(true)
                    else setDeskMessage(false)

                    if (subject.current?.value && desk.current?.value) {
                        setOpenModal(false)
                        history.push(`${location.pathname.split('/').slice(0,3).join('/')}/appointments?subject=${subject.current?.value}&desk=${desk.current?.value}`)
                    }
                }}
                />
            </Modal.Actions>
        </Modal>
        <Modal
            open={openModalTickets}
            onOpen={() => setOpenModalTickets(true)}
            onClose={() => setOpenModalTickets(false)}
        >
            <Modal.Header>Tickets</Modal.Header>
            <Modal.Content>
                <Label>Desk:</Label>
                <input style={{margin:'1%'}} ref={deskTickets} type='text' placeholder='Desk'/>
                <Message error hidden={!deskMessageTickets} icon='error'>Desk is required</Message>
            </Modal.Content>
            <Modal.Actions>
                <Button content='Cancel' onClick={() => setOpenModalTickets(false)}/>
                <Button content='Ok' onClick={() => {
                    if (!deskTickets.current?.value) setDeskMessageTickets(true)
                    else {
                        setOpenModalTickets(false)
                        setDeskMessageTickets(false)
                        history.push(`${location.pathname.split('/').slice(0,3).join('/')}/tickets?desk=${deskTickets.current?.value}`)
                    }
                }}
                />
            </Modal.Actions>
        </Modal>
    </>
}