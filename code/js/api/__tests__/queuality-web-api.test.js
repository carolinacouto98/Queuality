'use strict'

const { ObjectId, MongoClient } = require('mongodb')
const frisby = require('frisby')

const server = require('../lib/server.js')

const url = 'mongodb://localhost:27017'
const dbName = 'queualitymock'
let srv, cli

// eslint-disable-next-line no-undef
beforeAll(async () => {
    try {
        const client = await MongoClient.connect(`${url}/${dbName}`, { useUnifiedTopology: true })
        const db = client.db()

        const empRes = await db.collection('employee').insertMany(employees)
        console.log('inserted', empRes.insertedCount.toString)

        const queRes = await db.collection('queue').insertMany(queues)
        console.log('inserted', queRes.insertedCount.toString)

        const appRes = await db.collection('appointment').insertMany(appointments)
        console.log('inserted', appRes.insertedCount.toString)

        await client.close();
        [srv, cli] = await server.run(3000, url, dbName)
    } catch (err) { console.error(err) }
})

//------------------EMPLOYEE---------------------

// eslint-disable-next-line no-undef
it('test route to get employee', () => frisby
    .get('http://localhost:3000/api/employees/0123456789nc')
    .expect('status', 200)
)

// eslint-disable-next-line no-undef
it('test route to get employees', () => frisby
    .get('http://localhost:3000/api/employees')
    .expect('status', 200)
)
// eslint-disable-next-line no-undef
it('test route to add employee', () => frisby
    .post('http://localhost:3000/api/employees/', {name: 'John', roles: ['admin']})
    .expect('status', 201)
)

// eslint-disable-next-line no-undef
it('test route to delete employee', () => frisby
    .del('http://localhost:3000/api/employees/0123456789nc')
    .expect('status', 200)
)

//------------------QUEUE---------------------

// eslint-disable-next-line no-undef
it('test route to get queues', () => frisby
    .get('http://localhost:3000/api/queues/')
    .expect('status', 200)
)

// eslint-disable-next-line no-undef
it('test route to get queue', () => frisby
    .get('http://localhost:3000/api/queues/0123456789q1')
    .expect('status', 200)
)

// eslint-disable-next-line no-undef
it('test route to add queue', () => frisby
    .post('http://localhost:3000/api/queues/', {name:'q', subject:'s'})
    .expect('status', 201)
)

// eslint-disable-next-line no-undef
it('test route to update queue', () => frisby
    .patch('http://localhost:3000/api/queues/0123456789q1', {subject:'s'})
    .expect('status', 200)
)

// eslint-disable-next-line no-undef
it('test route to delete queue', () => frisby
    .del('http://localhost:3000/api/queues/0123456789q2')
    .expect('status', 200)
)

// eslint-disable-next-line no-undef
it('test route to get tickets from queue', () => frisby
    .get('http://localhost:3000/api/queues/0123456789q1/current-ticket')
    .expect('status', 200)
)

// eslint-disable-next-line no-undef
it('test route to add tickets to queue', () => frisby
    .put('http://localhost:3000/api/queues/0123456789q1/current-ticket')
    .expect('status', 200)
)

//------------------SUBJECT-MANAGER---------------------

// eslint-disable-next-line no-undef
it('test route to get subject-manager', () => frisby
    .get('http://localhost:3000/api/subject-manager/')
    .expect('status', 200)
)

// eslint-disable-next-line no-undef
it('test route to add subject-manager', () => frisby
    .post('http://localhost:3000/api/subject-manager/', {desk: 'd', subject: 's', duration:'00:30:00'})
    .expect('status', 201)
)

// eslint-disable-next-line no-undef
it('test route to get subjects', () => frisby
    .get('http://localhost:3000/api/subject-manager/subjects')
    .expect('status', 200)
)

// eslint-disable-next-line no-undef
it('test route to delete subject', () => frisby
    .del('http://localhost:3000/api/subject-manager/subjects/0123456789p1')
    .expect('status', 200)
)

// eslint-disable-next-line no-undef
it('test route to get desks', () => frisby
    .get('http://localhost:3000/api/subject-manager/subjects/0123456789p1/desks')
    .expect('status', 200)
)

// eslint-disable-next-line no-undef
it('test route to get appointments', () => frisby
    .get('http://localhost:3000/api/subject-manager/subjects/0123456789p2/appointments')
    .expect('status', 200)
)

// eslint-disable-next-line no-undef
it('test route to add appointment', () => frisby
    .post('http://localhost:3000/api/subject-manager/subjects/0123456789p2/appointments', {date: '2021-05-13T16:00:00.000Z'})
    .expect('status', 201)
)

// eslint-disable-next-line no-undef
it('test route to get appointment', () => frisby
    .get('http://localhost:3000/api/subject-manager/subjects/0123456789p2/appointments/0123456789a2')
    .expect('status', 200)
)

// eslint-disable-next-line no-undef
it('test route to update appointment', () => frisby
    .patch('http://localhost:3000/api/subject-manager/subjects/0123456789p2/appointments/0123456789a2', {date: '2021-05-13T16:00:00.000Z'})
    .expect('status', 200)
)

// eslint-disable-next-line no-undef
it('test route to delete appointment', () => frisby
    .del('http://localhost:3000/api/subject-manager/subjects/0123456789p2/appointments/0123456789a2')
    .expect('status', 200)
)

//------------------TICKET---------------------

// eslint-disable-next-line no-undef
it('test route to get number of people waiting', () => frisby
    .get('http://localhost:3000/api/tickets/')
    .expect('status', 200)
)

// eslint-disable-next-line no-undef
it('test route to remove ticket waiting', () => frisby
    .put('http://localhost:3000/api/tickets')
    .expect('status', 200)
)

// eslint-disable-next-line no-undef
it('test route to take ticket ', () => frisby
    .post('http://localhost:3000/api/tickets', {queueId: '0123456789q3', queueName: 'Queue3'})
    .expect('status', 200)
)

// eslint-disable-next-line no-undef
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
        'password' : 'PassNuno',
        'roles' : []
    },{
        '_id' : ObjectId('0123456789jc'),
        'name' : 'Joana Campos',
        'password' : 'PassJoana',
        'roles' : []
    },{
        '_id' : ObjectId('0123456789cc'),
        'name' : 'Carolina Couto',
        'password' : 'PassCarol',
        'roles' : ['administrator']
    }
]
const queues = [
    {
        '_id' : ObjectId('0123456789q1'),
        'name' : 'Queue1',
        'priority' : 'true',
        'subject' : 'Subject1',
        'queueTicket': {
            'nrTotalTickets':0,
            'nrTicketsAnswered':0,
            'date':'ThuMay132021'
        }
    },{
        '_id' : ObjectId('0123456789q2'),
        'name' : 'Queue2',
        'priority' : 'false',
        'subject' : 'Subject2',
        'queueTicket': {
            'nrTotalTickets':0,
            'nrTicketsAnswered':0,
            'date':'ThuMay132021'
        }
    },{
        '_id' : ObjectId('0123456789q3'),
        'name' : 'Queue3',
        'priority' : 'false',
        'subject' : 'Subject3',
        'queueTicket': {
            'nrTotalTickets':0,
            'nrTicketsAnswered':0,
            'date':'ThuMay132021'
        }
    }
]
const appointments = [
    {
        '_id' : ObjectId('0123456789p1'),
        'desk' : 'Posto1',
        'subject' : 'Subject1',
        'duration' :'00:30:00',
        'appointments' : [{
            'id' : ObjectId('0123456789a1'),
            'date' : '05/07/2021'
        }],
    },
    {
        '_id' : ObjectId('0123456789p2'),
        'desk' : 'Posto2',
        'subject' : 'Subject2',
        'duration' :'00:20:00',
        'appointments' : [{
            'id' : ObjectId('0123456789a2'),
            'date' : '05/07/2021'
        }],
    }
]