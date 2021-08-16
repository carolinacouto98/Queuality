import { Card, Header } from 'semantic-ui-react'

interface NextTicketsCardsProps {
    ticket: string
}

export function NextTicketsCard(props: NextTicketsCardsProps) {
    return (
        <Card>
            <Card.Content style={{margin:'18%'}}>
                <Header size='huge'>{props.ticket}</Header>
            </Card.Content>
        </Card>
    )
}