import { useRef, useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { Button, Icon, Menu, Message, Modal } from "semantic-ui-react"

export default function Navbar() {
    const location = useLocation()
    const [openModal, setOpenModal] = useState<boolean>(false)
    const [deskMessage, setDeskMessage] = useState<boolean>(false)
    const [subjectMessage, setSubjectMessage] = useState<boolean>(false)
    const desk = useRef<HTMLInputElement>(null)
    const subject = useRef<HTMLInputElement>(null)

    return <>
        <Menu style={{backgroundColor:'#33BEFF', fontColor:'#FFFFFF' }} borderless pointing secondary textAlign='left'>
            <Menu.Item 
                active={location.pathname === '/queuality'}
                as={ Link } to='/queuality'>
                    <Icon name='home'/>
                    Home
            </Menu.Item>
            <Menu.Item 
                active={location.pathname.includes('/queuality/sections') && !location.pathname.includes('/appointments')}
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
                location.pathname.match('/queuality/sections/.') ?
                <Menu.Item
                    active={ location.pathname.includes('/appointments') }
                    onClick={() => setOpenModal(true)}
                    link
                >
                    <Icon name='calendar alternate'/>
                    Appointments
                </Menu.Item>
                :<></>
            }
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
                        const url = `${window.location.href.replace(/\/$/g, '')}/appointments?subject=${subject.current?.value}&desk=${desk.current?.value}`
                        window.location.replace(url)
                    }
                }} 
                />
            </Modal.Actions>
        </Modal>
    </>
}