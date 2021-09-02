import { useEffect, useState } from 'react'
import { Button, Container, Divider, Grid, GridRow, Header, Segment } from 'semantic-ui-react'
import { LoginService } from './LoginService'
import * as API from '../../common/FetchUtils'
import * as Siren from '../../common/Siren'
import { API_BASE_URL } from '../../App'
import { link } from 'fs'
import { Link } from 'react-router-dom'

type LoginProps = {
    service : LoginService
}

type LoginInfo = API.FetchInfo<Siren.Entity<undefined, undefined>>
type LoginRequest = API.Request<Siren.Entity<undefined, undefined>>

function getLoginLinks(info? : LoginInfo) : String[] | undefined {
    return info?.result?.body?.links.map(link => API_BASE_URL.replace('/queuality', '').concat(link.href)) 
}

export default function LoginPage({ service } : LoginProps) {
    const [loginList, setLoginList] = useState<LoginInfo>()
    useEffect(() => {
            async function sendRequests(request : LoginRequest) {
                try {
                    setLoginList({ status: API.FetchState.NOT_READY })
                    const result : API.Result<Siren.Entity<undefined, undefined>> = await request.send()
                    if (!result.header.ok) return
                    setLoginList({ 
                        status: result.header.ok && result.body ? API.FetchState.SUCCESS : API.FetchState.ERROR,
                        result
                    })
                } catch (reason) {
                    if(reason.name !== 'AbortError')
                    setLoginList({status: API.FetchState.ERROR})
                }
            }
            sendRequests(service.getLogins())
        }, [service]
    )

    const loginLinks = getLoginLinks(loginList)
    loginLinks?.splice(0,1)
    console.log(loginLinks)
    return(
        <Grid columns='equal' style={{ height: '100vh' }}>
            <Grid.Column/>
            <Grid.Column width='9' verticalAlign='middle'>
                <Segment placeholder>
                    <Grid container columns={2} relaxed='very' stackable style={{margin : '5%'}}>
                        <Grid.Column verticalAlign='top'>
                            <Header content='Login' primary />
                            {
                                loginLinks?.map(link => 
                                    <Button as='a' href={link.concat(window.location.search || '?nextURL=http://localhost:3000/queuality')} content={link.split('/')[6]} style={{marginBottom: '2%'}} />
                                )
                            }
                        </Grid.Column>
                        <Grid.Column verticalAlign='top'>
                            <Button content='Sign up' icon='signup' size='big' />
                        </Grid.Column>
                    </Grid>
                    <Divider vertical>Or</Divider>
                </Segment>
            </Grid.Column>
            <Grid.Column/>
        </Grid>
    )
}