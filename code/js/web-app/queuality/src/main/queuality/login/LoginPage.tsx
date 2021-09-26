import { useEffect, useState } from 'react'
import { Button, Divider, Grid, Header, Segment } from 'semantic-ui-react'
import { LoginService } from '../../common/services/LoginService'
import * as API from '../../common/FetchUtils'
import * as Siren from '../../common/Siren'
import { API_BASE_URL } from '../../App'

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
    const [signupList, setSignupList] = useState<LoginInfo>()
    useEffect(() => {
            async function sendRequests(request : LoginRequest, setState: React.Dispatch<React.SetStateAction<LoginInfo | undefined>>) {
                try {
                    setState({ status: API.FetchState.NOT_READY })
                    const result : API.Result<Siren.Entity<undefined, undefined>> = await request.send()
                    if (!result.header.ok) return
                    setState({ 
                        status: result.header.ok && result.body ? API.FetchState.SUCCESS : API.FetchState.ERROR,
                        result
                    })
                } catch (reason) {
                    if(reason.name !== 'AbortError')
                    setState({status: API.FetchState.ERROR})
                }
            }
            sendRequests(service.getLogins(), setLoginList)
            sendRequests(service.getSignups(), setSignupList)
        }, [service]
    )

    const loginLinks = getLoginLinks(loginList)
    const signupLinks = getLoginLinks(signupList)
    loginLinks?.splice(0,1)
    signupLinks?.splice(0,1)
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
                                    <Button 
                                        as='a' 
                                        href={link.concat(window.location.search || '?nextURL=http://localhost:3000/queuality')} 
                                        content={link.split('/')[6]} style={{marginBottom: '2%'}} 
                                    />
                                )
                            }
                        </Grid.Column>
                        <Grid.Column verticalAlign='top'>
                        <Header content='Signup' primary />
                            {
                                signupLinks?.map(link => 
                                    <Button 
                                        as='a' 
                                        href={link.concat(window.location.search || '?nextURL=http://localhost:3000/queuality')} 
                                        content={link.split('/')[6]} style={{marginBottom: '2%'}} 
                                    />
                                )
                            }
                        </Grid.Column>
                    </Grid>
                    <Divider vertical>Or</Divider>
                </Segment>
            </Grid.Column>
            <Grid.Column/>
        </Grid>
    )
}