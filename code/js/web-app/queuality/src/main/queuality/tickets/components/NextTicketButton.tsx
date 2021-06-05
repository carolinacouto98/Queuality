import React, { useContext } from "react";
import { Button } from "semantic-ui-react";
import { TicketsControl } from './../TicketsControlPage'

interface NextTicketButtonProps {
    nextTicket?: () => void
}

export function NextTicketButton(props: NextTicketButtonProps) {
    const context = useContext(TicketsControl.showTicketContext)
    return(
        <Button onClick={() => {
            context.setShowTicket()
            if(props.nextTicket)
                props.nextTicket()
        }}>
            Next
        </Button>
    )

}