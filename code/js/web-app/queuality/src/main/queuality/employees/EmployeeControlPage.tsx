import React, { useEffect, useState } from 'react';
import { Header, Icon, Card, Breadcrumb } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { Employee } from './EmployeeModel';

export namespace EmployeesControl {

    type PageProps = {
        employees: Array<Employee>
    }
    
    

    export function Page(props: PageProps) {
        return (
            <>
                <PageHeader />
                <PageBody />
            </>
        )
    }

    function PageHeader() {
        return (
            <>
                <div className='Control-header'>                    
                    <Breadcrumb>
                        <Breadcrumb.Section link as={Link} to={'/queuality/'}>Home</Breadcrumb.Section>
                        <Breadcrumb.Divider icon='right chevron' />
                        <Breadcrumb.Section active>Tickets</Breadcrumb.Section>
                    </Breadcrumb>
                </div>
                <div>
                    <Header as='h2' icon textAlign='center' style={{ color: '#AFE5D1'}}>
                        <Icon style={{ backgroundColor: '#808283'}} name='ticket' circular />
                    <Header.Content style={{ color: '#808283'}} >Tickets</Header.Content>
                    </Header>
                </div>
            </>
        )
    }

    type EmployeeProps = {
    }

    function PageBody(props: EmployeeProps) {
        return (
            <>
            </>
        )
    }
}