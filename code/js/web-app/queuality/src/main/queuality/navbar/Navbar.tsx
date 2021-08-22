import { useEffect, useRef, useState } from "react"
import { Link, useLocation, useParams } from "react-router-dom"
import { Button, Icon, Menu, Modal } from "semantic-ui-react"

type Param = {
    sectionId?: string
}

export default function Navbar() {
    const location = useLocation()
    const [openModal, setOpenModal] = useState<boolean>(false)
    const desk = useRef<HTMLInputElement>(null)
    const subject = useRef<HTMLInputElement>(null)

    return <>
        <Menu style={{backgroundColor:'#33BEFF', fontColor:'#FFFFFF' }} borderless pointing secondary textAlign='left'>
            <Menu.Item 
                active={location.pathname === '/'}
                as={ Link } to='/'>
                    <Icon name='home'/>
                    Home
            </Menu.Item>
            <Menu.Item 
                active={location.pathname.match('/queuality/sections/.') !== null && !location.pathname.includes('/appointments')}
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
            </Modal.Content>
            <Modal.Actions>
                <Button content='Cancel' onClick={() => setOpenModal(false)}/>
                <Button content='Ok' onClick={() => setOpenModal(false)} 
                    as={ Link } to={`/${location.pathname.split('/').slice(0, 3).join('/')}?subject=${subject.current?.value}&desk=${desk.current?.value}`}/>
            </Modal.Actions>
        </Modal>
    </>
}