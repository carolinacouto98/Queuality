
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
import { IonCard, IonCardHeader, IonCardTitle,IonCardContent } from '@ionic/react'
import { useHistory } from 'react-router'
import { Section } from '../../model/SectionsModel'

type Props = {
    section: Section,
    link: string
}

const SectionCard: React.FC<Props> = ({section, link}) => {
    const history = useHistory()
    return(
        <IonCard id ={section.name} button onClick={() => {history.push(link)}}>
            <IonCardHeader>
                <IonCardTitle>
                    {section.name}
                </IonCardTitle>  
            </IonCardHeader>
            <IonCardContent>
                {section.subjects}
            </IonCardContent>
        </IonCard>
    )
}

export default SectionCard