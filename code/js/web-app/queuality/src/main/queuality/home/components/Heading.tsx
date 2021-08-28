import { Container, Header, Segment } from "semantic-ui-react";

type HeadingProps = {
    children?: React.ReactNode
}

export default function Heading({ children }: HeadingProps) {
    return <Container text>
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
        {children}
    </Container>
}