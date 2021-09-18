/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
import { IonCard, IonCardHeader, IonCardTitle,IonCardContent } from '@ionic/react'
import { useHistory } from 'react-router'
import { Section } from '../../model/SectionsModel'
import './SectionCard.css'

type Props = {
    section: Section,
    link: string
}

const SectionCard: React.FC<Props> = ({section, link}) => {
    const history = useHistory()
    return(
        <IonCard id ={section._id} button onClick={() => {history.push(link)}} className='SectionCard'>
            <IonCardHeader>
                <IonCardTitle color='primary'>
                    {section._id}
                </IonCardTitle>  
            </IonCardHeader>
            <IonCardContent>
                {section.subjects.map( (subject, index) =>  {
                    if(index === section.subjects.length - 1)
                        return subject.description
                    else
                        return subject.description+', '
                })}
            </IonCardContent>
        </IonCard>
    )
}

export default SectionCard