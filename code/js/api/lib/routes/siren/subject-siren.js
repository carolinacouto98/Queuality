'use strict'
const siren = require('../../common/siren')

const removeTicketLinks = (sectionId, subjectId) => [
    siren.selfLink(`${siren.BASENAME}/sections/${sectionId}/subjects/${subjectId}`)
]
const getSubjectsLinks = (sectionId) =>  [siren.selfLink(`${siren.BASENAME}/sections/${sectionId}/subjects`)]
const addSubjectLinks = (sectionId, subjectId) => [
    siren.selfLink(`${siren.BASENAME}/sections/${sectionId}/subjects`),
    new siren.SirenLink(['/rel/subject'], `${siren.BASENAME}/sections/${sectionId}/subjects/${subjectId}`),
    new siren.SirenLink(['/rel/sections'],`${siren.BASENAME}/sections` )]
const updateSubjectLinks = (sectionId, subjectId) => [
    siren.selfLink(`${siren.BASENAME}/sections/${sectionId}/subjects/${subjectId}`),
    new siren.SirenLink(['/rel/subjects'],`${siren.BASENAME}/sections/${sectionId}/subjects` )
]
const deleteSubjectLinks = (sectionId) => [new siren.SirenLink(['/rel/subjects'],`${siren.BASENAME}/sections/${sectionId}/subjects` )]

function addSubjectAction (sectionId) {
    return new siren.SirenAction(
        'add-subject',
        'Add a Subject',
        'POST',
        `${siren.BASENAME}/sections/${sectionId}/subjects`,
        [
            new siren.Field('name', 'text'),
            new siren.Field('priority', 'boolean'),
            new siren.Field('subject', 'text')
        ]
    )
} 

function updateSubjectAction (sectionId, subjectId) {
    return new siren.SirenAction(
        'update-subject',
        'Update a Subject',
        'PATCH',
        `${siren.BASENAME}/sections/${sectionId}/subjects/${subjectId}`,
        [
            new siren.Field('priority', 'boolean'),
            new siren.Field('subject', 'text')
        ]
    )
} 

function deleteSubjectAction (sectionId, subjectId) {
    return new siren.SirenAction(
        'delete-subject',
        'Delete a subject',
        'DELETE',
        `${siren.BASENAME}/sections/${sectionId}/subjects/${subjectId}`
    )
} 

function removeTicketAction (sectionId, subjectId) {
    return new siren.SirenAction(
        'remove-ticket',
        'Remove a Ticket',
        'PUT',
        `${siren.BASENAME}/sections/${sectionId}/subjects/${subjectId}`,
        [
            new siren.Field('ticket', 'string'),
        ]
    )
} 

function setSubEntities(subjects){
    const subEntities = []
    subjects.forEach(element => {
        subEntities.push(
            new siren.EmbeddedEntity(
                ['/rel/subject'],
                [
                    siren.selfLink(`${siren.BASENAME}/sections/${element.sectionId}/subjects/${element._id}`)
                ],
                element,
                ['Subject'],
                [
                    updateSubjectAction(element.sectionId, element._id),
                    deleteSubjectAction(element.sectionId, element._id),
                    removeTicketAction(element.sectionId, element._id)
                ],
                'Get Subject'
            )        
        )
    })
    return subEntities
}

module.exports = {
    removeTicketLinks,
    getSubjectsLinks,
    addSubjectLinks,
    updateSubjectLinks,
    deleteSubjectLinks,
    addSubjectAction,
    updateSubjectAction,
    deleteSubjectAction,
    setSubEntities
}
