/* eslint-disable @typescript-eslint/no-extra-non-null-assertion */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
import { IonContent, IonPage} from '@ionic/react'
import { useEffect, useState } from 'react'
import { SectionsService } from '../services/SectionsService'
import *  as API from '../common/FetchUtils'
import * as Siren from '../common/Siren'
import* as Model from '../model/SectionsModel'
import SectionCard from '../components/sections/SectionCard'

type SectionsRequest = API.Request<Siren.Entity<Model.SectionsDto, Model.Section>> 
type SectionsInfo = API.FetchInfo<Siren.Entity<Model.SectionsDto, Model.Section>> 

type Props = {
    service: SectionsService
}
const Sections: React.FC<Props> = ({service}) => {
    const [sectionsInfo, setSections ] = useState<SectionsInfo>()
    useEffect(() => {
        async function sendSectionsRequest(request: SectionsRequest) {
            try {
                setSections({ status: API.FetchState.NOT_READY })
                const result: API.Result<Siren.Entity<Model.SectionsDto,Model.Section>> = await request.send()
                setSections({ 
                    status: result.header.ok && result.body ? API.FetchState.SUCCESS : API.FetchState.ERROR,
                    result
                })
            }
            catch(reason) {
                if(reason.name !== 'AbortError')
                    setSections({ status: API.FetchState.ERROR })
            }
        }
        sendSectionsRequest(service.getSections())
    
    },[service])
    const sections = getSectionsValue(sectionsInfo)
    return (
        <IonPage>
            <IonContent>
                {sectionsInfo && sections && sections.length?
                    sections.map(section => {
                        <SectionCard section={section} link={getSectionLink(section.name, sectionsInfo)!!}/>
                    })
                    : null
                }
                
            </IonContent>
        </IonPage>
    )
}

export default Sections

function getSectionsValue(sectionsInfo?: SectionsInfo): Array<Model.Section>| undefined {
    return sectionsInfo && sectionsInfo.result && sectionsInfo.result?.body?.properties?.sections
}

function getSectionLink(sectionName: string, sectionsInfo?: SectionsInfo): string | undefined {
    return sectionsInfo?.result?.body?.entities?.find(entity => entity.properties?.name===sectionName)?.links?.find(link => link.rel.includes(Siren.SELF_RELATION))?.href
}