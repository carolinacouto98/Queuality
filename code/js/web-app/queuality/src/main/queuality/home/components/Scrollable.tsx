import { Visibility } from 'semantic-ui-react'

type ScrollableProps = {
    children: React.ReactNode,
    setFixed: (fixed: boolean) => void
}

export default function Scrollable({children, setFixed}: ScrollableProps) {
    return (
        <Visibility
            once={false}
            onBottomPassed={() => setFixed(true)}
            onBottomPassedReverse={() => setFixed(false)}
            children={children}
        />
    )
}