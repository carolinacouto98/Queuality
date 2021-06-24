/* eslint-disable no-undef */
'use strict'

const { ObjectId, MongoClient } = require('mongodb')
const frisby = require('frisby')

const server = require('../lib/server.js')

const url = 'mongodb://localhost:27017'
const dbName = 'queualitymock'
let srv, cli


beforeAll(async () => {
    try {
        const client = await MongoClient.connect(`${url}/${dbName}`, { useUnifiedTopology: true })
        const db = client.db()

        const empRes = await db.collection('employee').insertMany(employees)
        console.log('inserted', empRes.insertedCount.toString)

        const secRes = await db.collection('section').insertMany(sections)
        console.log('inserted', secRes.insertedCount.toString)

        const appRes = await db.collection('appointment').insertMany(appointments)
        console.log('inserted', appRes.insertedCount.toString)

        await client.close();
        [srv, cli] = await server.run(3000, url, dbName)
    } catch (err) { console.error(err) }
})

//------------------EMPLOYEE---------------------

it('test route to update employee', () => frisby
    .patch('http://localhost:5000/queuality/api/employees/0123456789nc', {desk: 'desk 5'})
    .expect('status', 200)
    .expect('json', 'properties', {
        '_id' : ObjectId('0123456789nc'),
        'name' : 'Nuno Cardeal',
        'roles' : [],
        'sections': ['Section 2', 'Section 3'],
        'desk': 'desk 5'
    })
)

it('test route to update employee that doesnt exist', () => frisby
    .patch('http://localhost:5000/queuality/api/employees/0123456789jp', {desk: 'desk 5'})
    .expect('status', 404)
)

it('test route to update employee with wrong body', () => frisby
    .patch('http://localhost:5000/queuality/api/employees/0123456789jp', {desks: 'desk 5'})
    .expect('status', 400)
) 
it('test route to get employees', () => frisby
    .get('http://localhost:5000/queuality/api/employees')
    .expect('status', 200)
    .expect('json','properties', employees)
)

it('test route to add employee', () => frisby
    .post('http://localhost:5000/queuality/api/employees', {name: 'John', roles: ['admin'], sections : ['Section 1'], desk: 'desk 4'})
    .expect('status', 201)
    .expect('json', 'properties', {name: 'John', roles: ['admin'], sections : ['Section 1'], desk: 'desk 4'})
)

it('test route to add employee that already exists', () => frisby
    .post('http://localhost:5000/queuality/api/employees', {
        'name' : 'Nuno Cardeal',
        'roles' : [],
        'sections': ['Section 2', 'Section 3'],
        'desk': 'desk 1'})
    .expect('status', 409)
)

it('test route to add employee with wrong body', () => frisby
    .post('http://localhost:5000/queuality/api/employees', {
        'sections': ['Section 2', 'Section 3'],
        'desk': 'desk 1'})
    .expect('status', 400)
)

it('test route to delete employee', () => frisby
    .del('http://localhost:5000/queuality/api/employees/0123456789nc')
    .expect('status', 200)
)

it('test route to delete employee that doesnt exist', () => frisby
    .del('http://localhost:5000/queuality/api/employees/0123456789pc')
    .expect('status', 404)
)
//------------------SECTION---------------------

it('test route to get sections', () => frisby
    .get('http://localhost:5000/queuality/api/sections')
    .expect('status', 200)
    .expect('json', 'properties', sections)
)

it('test route to get section', () => frisby
    .get('http://localhost:5000/queuality/api/queues/Section%20%1')
    .expect('status', 200)
    .expect('json', 'properties', {
        'name' : 'Section 1',
        'employees' : ['0123456789cc', '0123456789jc'],
        'workingHours' : {
            'begin' : '09:30:00',
            'end' : '19:00:00',
            'duration' : 30
        },
        'queue' : ['B1','A1' ,'A2' ,'C1','C2'],
        'subjects' : [
            {
                'name' : 'A',
                'subject' : 'CC',
                'priority' : false,
                'currentTicket' : 0,
                'totalTickets' : 2,
                'date' : '23/06/2021'
            },
            {
                'name' : 'B',
                'subject' : 'Prioritário',
                'priority' : true,
                'currentTicket' : 0,
                'totalTickets' : 1,
                'date' : '23/06/2021'
            },
            {
                'name' : 'C',
                'subject' : 'Carta',
                'priority' : false,
                'currentTicket' : 0,
                'totalTickets' : 2,
                'date' : '23/06/2021'
            }
        ]
    } )
)

it('test route to get section that doesnt exist', () => frisby
    .get('http://localhost:5000/queuality/api/queues/Section%20%0')
    .expect('status', 404)
)

it('test route to add section', () => frisby
    .post('http://localhost:5000/queuality/api/sections', {
        name:'Section 4',
        workingHours : {
            begin: '10:00:00',
            end:'20:00:00',
            duration: 20
        }})
    .expect('status', 201)
    .expect('json', 'properties', {
        'name' : 'Section 4',
        'employees' : [],
        'workingHours' : {
            'begin' : '10:00:00',
            'end' : '20:00:00',
            'duration' : 20
        },
        'queue' : [],
        'subjects' : []
    }

    )
)

it('test route to add section that already exists', () => frisby
    .post('http://localhost:5000/queuality/api/sections', {
        name:'Section 1',
        workingHours : {
            begin: '10:00:00',
            end:'20:00:00',
            duration: 20
        }})
    .expect('status', 409)
) 

it('test route to add section with wrong body', () => frisby
    .post('http://localhost:5000/queuality/api/sections', {name:'Section 1'})
    .expect('status', 400)
) 
it('test route to update section', () => frisby
    .patch('http://localhost:5000/queuality/api/sections/Section%20%4', {
        workingHours:{
            begin: '09:00:00',
            end: '19:00:00',
            duration: 30
        }})
    .expect('status', 200)
    .expect('json', 'properties', {
        'name' : 'Section 4',
        'employees' : [],
        'workingHours' : {
            'begin' : '09:00:00',
            'end' : '19:00:00',
            'duration' : 30
        },
        'queue' : [],
        'subjects' : []
    } )
)

it('test route to update section that doesnt exist', () => frisby
    .patch('http://localhost:5000/queuality/api/sections/Section%20%0', {
        workingHours:{
            begin: '09:00:00',
            end: '19:00:00',
            duration: 30
        }})
    .expect('status', 404)
)
it('test route to update section with wrong body', () => frisby
    .patch('http://localhost:5000/queuality/api/sections/Section%20%4'
    )
    .expect('status', 400)
)

it('test route to delete section', () => frisby
    .del('http://localhost:5000/queuality/api/sections/Section%20%4')
    .expect('status', 200)
)

it('test route to delete section that doesnt exist', () => frisby
    .del('http://localhost:5000/queuality/api/sections/Section%20%0')
    .expect('status', 200)
)
// eslint-disable-next-line no-undef
it('test route to get tickets from queue', () => frisby
    .get('http://localhost:5000/queuality/api/sections/Section%20%1/queue')
    .expect('status', 200)
    .expect('json', 'properties', {
        tickets: ['B1','A1' ,'A2' ,'C1','C2']
    })
)

it('test route to get tickets from queue from a section that doesnt exist', () => frisby
    .get('http://localhost:5000/queuality/api/sections/Section%20%0/queue')
    .expect('status', 404)
)

it('test route to get next ticket from queue', () => frisby
    .get('http://localhost:5000/queuality/api/sections/Section%20%1/queue?next=true&subject=B')
    .expect('status', 200)
    .expect('json', 'properties', {
        ticket: 'B1'
    })
)

it('test route to get next ticket from queue from section that doesnt exist', () => frisby
    .get('http://localhost:5000/queuality/api/sections/Section%20%0/queue?next=true&subject=B')
    .expect('status', 404)
)

it('test route to add tickets to queue', () => frisby
    .post('http://localhost:5000/queuality/api/sections/Section%20%1/queue', {subject: 'A'})
    .expect('status', 200)
    .expect('json', 'properties', {
        ticket: 'A3'
    })
)

it('test route to add tickets to queue to section that doesnt exist', () => frisby
    .post('http://localhost:5000/queuality/api/sections/Section%20%0/queue', {subject: 'A'})
    .expect('status', 409)
)

it('test route to add tickets to queue with wrong body', () => frisby
    .post('http://localhost:5000/queuality/api/sections/Section%20%1/queue', {something : 'A'})
    .expect('status', 400)
)

//------------------SUBJECT---------------------

// eslint-disable-next-line no-undef
it('test route to get subjects from section', () => frisby
    .get('http://localhost:5000/queuality/api/sections/Section%20%1/subjects')
    .expect('status', 200)
    .expect('json', 'properties', { 'subjects' : [
        {
            'name' : 'A',
            'subject' : 'CC',
            'priority' : false,
            'currentTicket' : 0,
            'totalTickets' : 2,
            'date' : '23/06/2021'
        },
        {
            'name' : 'B',
            'subject' : 'Prioritário',
            'priority' : true,
            'currentTicket' : 0,
            'totalTickets' : 1,
            'date' : '23/06/2021'
        },
        {
            'name' : 'C',
            'subject' : 'Carta',
            'priority' : false,
            'currentTicket' : 0,
            'totalTickets' : 2,
            'date' : '23/06/2021'
        }
    ]})
)

it('test route to get subjects from section that doesnt exist', () => frisby
    .get('http://localhost:5000/queuality/api/sections/Section%20%0/subjects')
    .expect('status', 404)
)

it('test route to add subject to section', () => frisby
    .post('http://localhost:5000/queuality/api/sections/Section%20%1/subjects', {name: 'D', subject: 'Levantamentos', priority:false})
    .expect('status', 201)
    .expect('json','properties', {
        'name' : 'D',
        'subject' : 'Levantamentos',
        'priority' : false,
        'currentTicket' : 0,
        'totalTickets' : 0,
        'date' : '23/06/2021'
    })
)

it('test route to add subject to section that doesnt exist', () => frisby
    .post('http://localhost:5000/queuality/api/sections/Section%20%0/subjects', {name: 'D', subject: 'Levantamentos', priority:false})
    .expect('status', 404)
)

it('test route to add subject to section with wrong body', () => frisby
    .post('http://localhost:5000/queuality/api/sections/Section%20%1/subjects', {name: 'D', subject: 'Levantamentos'})
    .expect('status', 400)
)

it('test route to add subject that already exists to section ', () => frisby
    .post('http://localhost:5000/queuality/api/sections/Section%20%0/subjects', {name: 'C', subject: 'Carta', priority:false})
    .expect('status', 409)
)

it('test route to update subject from section', () => frisby
    .get('http://localhost:5000/queuality/api/sections/Section%20%1/subjects/D', {subject: 'Levantar Documentos'})
    .expect('status', 200)
    .expect('json', 'properties', {
        'name' : 'D',
        'subject' : 'Levantar Documentos',
        'priority' : false,
        'currentTicket' : 0,
        'totalTickets' : 0,
        'date' : '23/06/2021'
    })
)

it('test route to update subject from section that doesnt exists', () => frisby
    .get('http://localhost:5000/queuality/api/sections/Section%20%0/subjects/D', {subject: 'Levantar Documentos'})
    .expect('status', 404)
)
it('test route to update subject that doesnt exist from section', () => frisby
    .get('http://localhost:5000/queuality/api/sections/Section%20%1/subjects/E', {subject: 'Levantar Documentos'})
    .expect('status', 404)

)
it('test route to update subject from section with wrong body', () => frisby
    .get('http://localhost:5000/queuality/api/sections/Section%20%1/subjects/D', {name: 'C'})
    .expect('status', 400)
)

it('test route to delete subject from section', () => frisby
    .del('http://localhost:5000/queuality/api/sections/Section%20%1/subjects/A')
    .expect('status', 200)
)

it('test route to delete subject from section that doenst exist ', () => frisby
    .del('http://localhost:5000/queuality/api/sections/Section%20%0/subjects/A')
    .expect('status', 404)
)

it('test route to delete subject that doesnt exist from section', () => frisby
    .del('http://localhost:5000/queuality/api/sections/Section%20%1/subjects/A')
    .expect('status', 404)
)

it('test route to remove ticket', () => frisby
    .put('http://localhost:5000/queuality/api/sections/Section%20%1/subjects/D', {ticket: 'A2'})
    .expect('status', 200)
    .expect('json', 'properties', {
        ticket:'A2'
    })
)

it('test route to remove ticket with wrong body', () => frisby
    .put('http://localhost:5000/queuality/api/sections/Section%20%1/subjects/D', {ticket: 'A2'})
    .expect('status', 200)
)

it('test route to remove ticket from a section that doesnt exist', () => frisby
    .put('http://localhost:5000/queuality/api/sections/Section%20%0/subjects/D', {ticket: 'A2'})
    .expect('status', 404)
)

it('test route to remove ticket from a subject that doesnt exist', () => frisby
    .put('http://localhost:5000/queuality/api/sections/Section%20%1/subjects/E', {ticket: 'A2'})
    .expect('status', 404)
)

it('test route to remove ticket that doesnt exist', () => frisby
    .put('http://localhost:5000/queuality/api/sections/Section%20%1/subjects/D', {ticket: 'A20'})
    .expect('status', 404)
)

//------------------APPOINTMENT---------------------

it('test route to get appointments', () => frisby
    .get('http://localhost:5000/queuality/api/appointments?section=Section%20%1&desk=desk%20%1')
    .expect('status', 200)
    .expect('json', 'properties', appointments)
)

it('test route to get appointments from section that doenst exist', () => frisby
    .get('http://localhost:5000/queuality/api/appointments?section=Section%20%0&desk=desk%20%1')
    .expect('status', 404)
)

it('test route to get appointments from desk that doesnt exist', () => frisby
    .get('http://localhost:5000/queuality/api/appointments?section=Section%20%1&desk=desk%20%10')
    .expect('status', 404)
)

it('test route to get available hours', () => frisby
    .get('http://localhost:5000/queuality/api/appointments?subject=CC&day=2021-07-13')
    .expect('status', 200)
    .expect('json', 'properties', appointments)
)

it('test route to get available hours from subject that doesnt exist', () => frisby
    .get('http://localhost:5000/queuality/api/appointments?subject=CS&day=2021-07-13')
    .expect('status', 404)
)

it('test route to add appointment', () => frisby
    .post('http://localhost:5000/queuality/api/appointments', {date: '2021-07-13T16:00:00.000Z', desk: 'desk1', section: 'Section 1', subject: 'CC'})
    .expect('status', 201)
    .expect('json', 'properties', {
        '_id' : ObjectId('0123456789p3'),
        'desk' : 'desk1',
        'subject' : 'CC',
        'date' : '2021-07-13T16:00:00.000Z',
        'section': 'Section 1'
    })
)

it('test route to add appointment with wrong body', () => frisby
    .post('http://localhost:5000/queuality/api/appointments', {date: '2021-07-13T16:00:00.000Z',  subject: 'CC'})
    .expect('status', 400)
)

it('test route to add appointment that already exists', () => frisby
    .post('http://localhost:5000/queuality/api/appointments', { 
        'desk' : 'desk 1',
        'subject' : 'Carta',
        'date' : '2021-07-05T16:30:00.000Z',
        'section': 'Section 1'})
    .expect('status', 409)
)

it('test route to get appointment', () => frisby
    .get('http://localhost:5000/queuality/api/appointments/0123456789p1')
    .expect('status', 200)
    .expect('json', 'properties', {
        '_id' : '0123456789p1',
        'desk' : 'desk1',
        'subject' : 'CC',
        'date' : '2021-07-05T16:00:00.000Z',
        'section': 'Section 1'
    })
)

it('test route to get appointment that doesnt exist', () => frisby
    .get('http://localhost:5000/queuality/api/appointments/0123456789p0')
    .expect('status', 404)
)

it('test route to update appointment', () => frisby
    .patch('http://localhost:5000/queuality/api/appointments/0123456789p2', {date: '2021-07-14T16:00:00.000Z'})
    .expect('status', 200)
    .expect('json', 'properties', {
        '_id' : '0123456789p2',
        'desk' : 'desk 1',
        'subject' : 'Carta',
        'date' : '2021-07-05T16:30:00.000Z',
        'section': 'Section 1'
    })
)

it('test route to update appointment that doesnt exist', () => frisby
    .patch('http://localhost:5000/queuality/api/appointments/0123456789p0', {date: '2021-07-14T16:00:00.000Z'})
    .expect('status', 404)
)

it('test route to update appointment with wrong body', () => frisby
    .patch('http://localhost:5000/queuality/api/appointments/0123456789p0', {date: '2021-07-14T16:00:00.000Z'})
    .expect('status', 400)
)

it('test route to delete appointment', () => frisby
    .del('http://localhost:5000/queuality/api/appointments/0123456789p2')
    .expect('status', 200)
)

it('test route to delete appointment that doesnt exist', () => frisby
    .del('http://localhost:5000/queuality/api/appointments/0123456789p0')
    .expect('status', 404)
)

afterAll(async () => {
    server.shutdown(srv, cli)
    const client = await MongoClient.connect(`${url}/${dbName}`, { useUnifiedTopology: true })
    const db = client.db()
    await db.dropDatabase()
    await client.close()

})


const employees = [ 
    {
        '_id' : ObjectId('0123456789nc'),
        'name' : 'Nuno Cardeal',
        'roles' : [],
        'sections': ['Section 2', 'Section 3'],
        'desk': 'desk 1'
    },{
        '_id' : ObjectId('0123456789jc'),
        'name' : 'Joana Campos',
        'roles' : [],
        'sections': [],
        'desk': 'desk 2'
    },{
        '_id' : ObjectId('0123456789cc'),
        'name' : 'Carolina Couto',
        'roles' : ['administrator'],
        'sections': [],
        'desk': 'desk 3'
    }
]
const sections = [
    {
        'name' : 'Section 1',
        'employees' : ['0123456789cc', '0123456789jc'],
        'workingHours' : {
            'begin' : '09:30:00',
            'end' : '19:00:00',
            'duration' : 30
        },
        'queue' : ['B1','A1' ,'A2' ,'C1','C2'],
        'subjects' : [
            {
                'name' : 'A',
                'subject' : 'CC',
                'priority' : false,
                'currentTicket' : 0,
                'totalTickets' : 2,
                'date' : '23/06/2021'
            },
            {
                'name' : 'B',
                'subject' : 'Prioritário',
                'priority' : true,
                'currentTicket' : 0,
                'totalTickets' : 1,
                'date' : '23/06/2021'
            },
            {
                'name' : 'C',
                'subject' : 'Carta',
                'priority' : false,
                'currentTicket' : 0,
                'totalTickets' : 2,
                'date' : '23/06/2021'
            }
        ]
    },{
        'name' : 'Section 2',
        'employees' : ['0123456789cc', '0123456789nc'],
        'workingHours' : {
            'begin' : '09:30:00',
            'end' : '19:00:00',
            'duration' : 30
        },
        'queue' : ['B2','B3','A1' ,'A2' ,'C1','C2', 'C3'],
        'subjects' : [
            {
                'name' : 'A',
                'subject' : 'Luz',
                'priority' : false,
                'currentTicket' : 0,
                'totalTickets' : 2,
                'date' : '23/06/2021'
            },
            {
                'name' : 'B',
                'subject' : 'Prioritário',
                'priority' : true,
                'currentTicket' : 1,
                'totalTickets' : 2,
                'date' : '23/06/2021'
            },
            {
                'name' : 'C',
                'subject' : 'Água',
                'priority' : false,
                'currentTicket' : 0,
                'totalTickets' : 3,
                'date' : '23/06/2021'
            }
        ]
    },
    {
        'name' : 'Section 3',
        'employees' : ['0123456789jc', '0123456789nc'],
        'workingHours' : {
            'begin' : '09:30:00',
            'end' : '19:00:00',
            'duration' : 30
        },
        'queue' : ['B1','B2','A2' ,'A3' ,'C3','C4'],
        'subjects' : [
            {
                'name' : 'A',
                'subject' : 'Passaporte',
                'priority' : false,
                'currentTicket' : 1,
                'totalTickets' : 2,
                'date' : '23/06/2021'
            },
            {
                'name' : 'B',
                'subject' : 'Prioritário',
                'priority' : true,
                'currentTicket' : 0,
                'totalTickets' : 2,
                'date' : '23/06/2021'
            },
            {
                'name' : 'C',
                'subject' : 'Finanças',
                'priority' : false,
                'currentTicket' : 2,
                'totalTickets' : 2,
                'date' : '23/06/2021'
            }
        ]
    }
]
const appointments = [
    {
        '_id' : ObjectId('0123456789p1'),
        'desk' : 'desk1',
        'subject' : 'CC',
        'date' : '2021-07-05T16:00:00.000Z',
        'section': 'Section 1'
    },
    {
        '_id' : ObjectId('0123456789p2'),
        'desk' : 'desk 1',
        'subject' : 'Carta',
        'date' : '2021-07-05T16:30:00.000Z',
        'section': 'Section 1'
    }
]