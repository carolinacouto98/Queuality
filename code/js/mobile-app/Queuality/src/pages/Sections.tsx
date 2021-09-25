/* eslint-disable @typescript-eslint/no-extra-non-null-assertion */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
import { IonContent, IonGrid, IonPage, IonRow, IonTitle, IonToolbar, useIonViewWillEnter} from '@ionic/react'
import { useContext, useState } from 'react'
import * as Siren from '../common/Siren'
import * as Model from '../model/SectionsModel'
import SectionCard from '../components/sections/SectionCard'
import { API_BASE_URL, AppContext } from '../App'

type SectionsInfo = Siren.Entity<void, Model.Section> 

const Sections: React.FC = () => {
    const context = useContext(AppContext)
    const [sectionsInfo, setSections ] = useState<SectionsInfo>()

    useIonViewWillEnter(() => {
        context.sectionService.getSections()
            .then(result => 
                setSections(result))   
    })

    const sections = getSectionsValue(sectionsInfo)
    return (
        <IonPage>
            <IonToolbar>
                <IonTitle color='primary'>Sections</IonTitle>  
            </IonToolbar>
            <IonContent>
                {sectionsInfo && sections && sections.length?
                    <IonGrid>
                        {sections.map(section => (
                            <IonRow key={section._id}> 
                                <SectionCard key={section._id} section={section} link={getSectionLink(section._id, sectionsInfo)!!}/>
                            </IonRow>
                        ))}
                    </IonGrid>
                    : null
                } 
            </IonContent>
        </IonPage>
    )
}

export default Sections

function getSectionsValue(sectionsInfo?: SectionsInfo): Array<Model.Section>| undefined {
    return sectionsInfo && sectionsInfo.entities!!.map(entity => entity.properties!!)
}

function getSectionLink(sectionName: string, sectionsInfo?: SectionsInfo): string | undefined {
    return sectionsInfo?.entities?.find(entity => entity.properties?._id===sectionName)?.links?.find(link => link.rel.includes(Siren.SELF_RELATION))?.href.replace(API_BASE_URL,'')
}