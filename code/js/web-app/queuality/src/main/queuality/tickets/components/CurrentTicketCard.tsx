import { Card, Statistic } from 'semantic-ui-react'

export interface CurrentTicketCardProps {
    ticket?: string | undefined
}

export function CurrentTicketCard(props: CurrentTicketCardProps) {

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
