import { Container, Header } from 'semantic-ui-react'

export default function Heading() {
    return (
        <Container text>
            <Header 
                as='h1'
                content='Queuality' 
                style={{
                    fontFamily: 'Beon',
                    fontSize: '5em',
                    fontWeight: 'normal',
                    marginBottom: '4em',
                    marginTop: '3em',
                }}
            />
        </Container>
    )
}