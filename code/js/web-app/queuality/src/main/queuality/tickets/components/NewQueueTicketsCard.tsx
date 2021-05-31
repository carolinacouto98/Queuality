import React from 'react'
import { Button, Card } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

export function NewQueueTicketsCard() {
    return(
        <Card>
            <Card.Content>
                <Card.Header>
                    <h1>+</h1>
                </Card.Header>
            </Card.Content>
            <Card.Content extra>
                <Button as={Link} to={'/queues'} style={{color: 'white', backgroundColor: '#85C1E9'}}>
                    Add Queue
                </Button>
            </Card.Content>
        </Card>
    )
}