import { Button } from 'semantic-ui-react'

import * as Siren from '../../../common/Siren'
import * as QueueModel from '../../../common/model/QueueModel'

interface NextTicketButtonProps {
    actions?: Siren.Action[]
    hasNextTicket: boolean 
    handleNextTicket?: () => void
}

export function NextTicketButton(props: NextTicketButtonProps) {

    function nextTicket() {
        if(props.handleNextTicket)
            props.handleNextTicket()
    }
    return(
        <Button disabled={!props.actions?.find(action => action.name === QueueModel.ANSWER_TICKET_ACTION) || !props.hasNextTicket} onClick={nextTicket}>
            Next
        </Button>
    )

}