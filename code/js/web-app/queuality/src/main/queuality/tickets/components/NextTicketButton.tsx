import { Button } from 'semantic-ui-react'

interface NextTicketButtonProps {
    hasNextTicket: boolean 
    handleNextTicket?: () => void
}

export function NextTicketButton(props: NextTicketButtonProps) {
    //const context = useContext(TicketsControl.showTicketContext)

    function nextTicket() {
        if(props.handleNextTicket)
            props.handleNextTicket()
    }
    return(
        <Button disabled={!props.hasNextTicket} onClick={nextTicket}>
            Next
        </Button>
    )

}