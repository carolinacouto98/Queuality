import Heading from './components/Heading'
import Scrollable from './components/Scrollable'

import { Container, Grid, Header, Icon, List, Segment } from 'semantic-ui-react'

type HomePageProps = { 
    setFixed: (fixed: boolean) => void
}

export default function HomePage({ setFixed }: HomePageProps) {
    return (
        <>
            <Scrollable 
                setFixed={setFixed} 
                children= {<Segment 
                style={{
                    marginTop: '0',
                    backgroundColor: '#33BEFF',
                }}
            >
                <Heading/>
                </Segment>}
            />
            <Container text style={{padding: '8em 0em' }}>
                <Grid container divided='vertically' style={{marginTop: '2em'}}>
                    <Grid.Row>
                        <Grid.Column textAlign='justified'>
                            <Header as='h1' content='Queue Management System' textAlign='center'/>
                            Queuality is a Queue Management System that provides to all companies a solution to manage waiting queues.
                            This system is done thinking about the companies interests and the costumers quality of life, providing
                            an web application that can be used by the companies employees to manage their queues and more...
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row columns='2'>
                        <Grid.Column textAlign='justified'>
                            <Header as='h1' content='Mobile App' textAlign='center'/>
                            Queuality comes with a mobile application that can be used by the costumers to take and manage their tickets
                            without the need to worry about being always checking for the current ticket, since the app will automatically
                            notify the costumer when its ticket is closed to be called. Besides that the app is totally anonymous making it
                            totally safe to the costumers data.
                        </Grid.Column>
                        <Grid.Column textAlign='center'>
                            <Icon.Group size='huge'>
                                <Icon name='tablet alternate' size='huge'/>
                                <Icon name='user secret' size='big'/>
                            </Icon.Group>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row columns='2'>
                    <Grid.Column textAlign='center'>
                            <Icon.Group size='huge'>
                                <Icon name='calendar alternate' size='huge'/>
                            </Icon.Group>
                        </Grid.Column>
                        <Grid.Column textAlign='justified' verticalAlign='middle'>
                            <Header as='h1' content='Appointments' textAlign='center'/>
                            Queuality also provides a service to manage and create appointments. On the mobile app the costumer will be able to
                            create or delete an appointment. For the web app an employee with the right roles will be able to create, delete or
                            change an appointment.
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Container>
            <Segment color='black' inverted  style={{ padding: '5em 0em' }}>
                <Container>
                    <Grid inverted divided>
                        <Grid.Row textAlign='left'>
                            <Grid.Column width='3'>
                                <Header as='h4' inverted content='About'/>
                                <List link inverted>
                                    <List.Item as='a' href='https://isel.pt/'>ISEL</List.Item>
                                    <List.Item as='a' href='https://2021moodle.isel.pt/course/view.php?id=5900'>Subject</List.Item>
                                    <List.Item as='a' href='https://github.com/carolinacouto98/Queuality'>Open-Source Project</List.Item>
                                    <List.Item as='a' href='https://github.com/carolinacouto98/Queuality/wiki'>API Documentation</List.Item>
                                </List>
                            </Grid.Column>
                            <Grid.Column width='3'>
                                <Header as='h4' inverted content='Developers'/>
                                <List link inverted>
                                    <List.Item as='a' href='https://github.com/carolinacouto98'><List.Icon name='github'/>Carolina Couto</List.Item>
                                    <List.Item as='a' href='https://github.com/joanacampos3799'><List.Icon name='github'/>Joana Campos</List.Item>
                                    <List.Item as='a' href='https://github.com/nrcardeal'><List.Icon name='github'/>Nuno Cardeal</List.Item>
                                </List>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Container>
            </Segment>
        </>
    )
}