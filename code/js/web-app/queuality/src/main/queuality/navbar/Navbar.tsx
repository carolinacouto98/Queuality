import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Icon, Menu } from "semantic-ui-react";

export default function Navbar() {
    const [pathname, setPathname] = useState<string>(window.location.pathname)

    return <Menu style={{backgroundColor:'#33BEFF', fontColor:'#FFFFFF' }} borderless pointing secondary textAlign='left'>
        <Menu.Item 
            active={pathname === '/'}
            onClick={() => setPathname('/')}
            as={ Link } to='/'>
                <Icon name='home'/>
                Home
        </Menu.Item>
        <Menu.Item 
            active={pathname === '/queuality/sections'}
            onClick={() => setPathname('/queuality/sections')}
            as={ Link } to='/queuality/sections'>
                <Icon name='building'/>
                Sections
        </Menu.Item>
        <Menu.Item
            active={pathname === '/queuality/employees'} 
            onClick={() => setPathname('/queuality/employees')}
            as={ Link } to='/queuality/employees'>
                <Icon name='users'/>
                Employees
        </Menu.Item>
    </Menu>
}