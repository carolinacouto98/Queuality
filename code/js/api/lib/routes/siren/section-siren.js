'use strict'
const siren = require('../../common/siren')

const getSectionsLinks = [siren.selfLink(`${siren.BASENAME}/sections`)]
const addSectionLinks = (sectionId) => [siren.selfLink(`${siren.BASENAME}/sections`),
    new siren.SirenLink(['/rel/section'], `${siren.BASENAME}/sections/${sectionId}`)]
const updateSectionLinks = (sectionId) => [siren.selfLink(`${siren.BASENAME}/sections/${sectionId}`), 
    new siren.SirenLink(['/rel/sections'],`${siren.BASENAME}/sections`)]
const deleteSectionLinks = [new siren.SirenLink(['/rel/sections'],`${siren.BASENAME}/sections`)]
const getQueueTicketsLinks = (sectionId) => [siren.selfLink(`${siren.BASENAME}/sections/${sectionId}/queue`)]
const getNextTicketLinks = (sectionId, subjectId) => [siren.selfLink(`${siren.BASENAME}/sections/${sectionId}/queue?next=true&subject=${subjectId}`)]
const addTicketLinks = (sectionId) => [
    siren.selfLink(`${siren.BASENAME}/sections/${sectionId}/queue`),
    new siren.SirenLink(['/rel/section'], `${siren.BASENAME}/sections/${sectionId}`)
]

function addSectionAction () {
    return new siren.SirenAction(
        'add-section',
        'Add a Section',
        'POST',
        `${siren.BASENAME}/sections`,
        [
            new siren.Field('name', 'text'),
            new siren.Field('working-hours', 'object')
        ]
    )
} 

function updateSectionAction (sectionId) {
    return new siren.SirenAction(
        'update-section',
        'Update a Section',
        'PATCH',
        `${siren.BASENAME}/sections/${sectionId}`,
        [
            new siren.Field('working-hours', 'object')
        ]
    )
} 

function deleteSectionAction (sectionId) {
    return new siren.SirenAction(
        'delete-section',
        'Delete a Section',
        'DELETE',
        `${siren.BASENAME}/sections/${sectionId}`
    )
} 

function setSubEntities(sections){
    const subEntities = []
    sections.forEach(element => {
        subEntities.push(
            new siren.EmbeddedEntity(
                ['/rel/section'],
                [
                    siren.selfLink(`${siren.BASENAME}/sections/${element._id}`), 
                    new siren.SirenLink(['/rel/subjects'], `${siren.BASENAME}/sections/${element._id}/subjects`),
                    new siren.SirenLink(['/queue'], `${siren.BASENAME}/sections/${element._id}/queue`)
                ],
                element,
                ['Section'],
                [
                    updateSectionAction(element._id), 
                    deleteSectionAction(element._id)
                ],
                'Get Section'
            )        
        )
    })
    return subEntities
}

module.exports = {
    getNextTicketLinks,
    getQueueTicketsLinks,
    addTicketLinks,
    getSectionsLinks,
    addSectionLinks,
    updateSectionLinks,
    deleteSectionLinks,
    addSectionAction,
    setSubEntities
}
