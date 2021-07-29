import { Card, Statistic } from 'semantic-ui-react'

export interface CurrentTicketCardProps {
    ticket?: string | undefined
    //showTicket: boolean
}

export function CurrentTicketCard(props: CurrentTicketCardProps) {
    //const context = useContext(TicketsControl.showTicketContext)

    return (
        <Card color='blue' centered>
                <Statistic style={{marginTop: '15%', marginBottom: '15%'}}> 
                    <>                    
                        <Statistic.Value>{props.ticket ? props.ticket : '--'}</Statistic.Value>
                    </>
                </Statistic>
        </Card>
    )
}
