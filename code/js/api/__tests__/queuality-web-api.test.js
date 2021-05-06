'use strict'

const { ObjectId } = require('mongodb')
const frisby = require('frisby')
const mongodb = require('mongodb')

const server = require('../lib/server.js')

mongodb.max_delay = 0
const MongoClient = mongodb.MongoClient
MongoClient.persist='mongo.js'

const url = 'mongodb://localhost:27017'
const dbName = 'queualitymock'
let srv

beforeAll(() => {
    MongoClient.connect(`${url}/${dbName}`, {}, function(err, client) {
        const db = client.db()
        // Get the documents collection
        const colEmployee = db.collection('employee')
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
        colEmployee.insertMany(employees, function(err, result) {
            console.log('inserted', result)
        })    

        const colQueue = db.collection('queue')
        const queues = [
            {
                '_id' : ObjectId('0123456789q1'),
                'name' : 'Queue1',
                'priority' : 'true',
                'subject' : 'Subject1'
            },{
                '_id' : ObjectId('0123456789q2'),
                'name' : 'Queue2',
                'priority' : 'false',
                'subject' : 'Subject2'
            },{
                '_id' : ObjectId('0123456789q3'),
                'name' : 'Queue3',
                'priority' : 'false',
                'subject' : 'Subject3'
            }
        ]
        
        colQueue.insertMany(queues, function(err, result) {
            console.log('inserted', result)
        })

        const colAppointment = db.collection('appointment')
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
        colAppointment.insertMany(appointments, function(err, result) {
            console.log('inserted', result)
        })
        srv = server.run(3000, url, dbName)
    })
})

// eslint-disable-next-line no-undef
it('test route to get employees', () => frisby
    .get('http://localhost:3000/api/employees')
    .expect('status', 200)
    .then(console.log)
)

// eslint-disable-next-line no-undef
it('test route to get employee', () => frisby
    .get('http://localhost:3000/api/employees/0123456789nc')
    .expect('status', 200)
    .then(console.log)
)

// eslint-disable-next-line no-undef
it('test route to add employee', () => frisby
    .post('http://localhost:3000/api/employees/')
    .expect('status', 201)
    .then(console.log)
)

// eslint-disable-next-line no-undef
it('test route to delete employee', () => frisby
    .post('http://localhost:3000/api/employees/0123456789nc')
    .expect('status', 200)
    .then(console.log)
)

// eslint-disable-next-line no-undef
it('test route to get subjects', () => frisby
    .post('http://localhost:3000/api/subject-manager/')
    .expect('status', 200)
    .then(console.log)
)

// eslint-disable-next-line no-undef
it('test route to add subject', () => frisby
    .post('http://localhost:3000/api/subject-manager/')
    .expect('status', 201)
    .then(console.log)
)

// eslint-disable-next-line no-undef
it('test route to delete subject', () => frisby
    .post('http://localhost:3000/api/subject-manager/608e8b6fb16b8953cce719b4')
    .expect('status', 200)
    .then(console.log)
)

// // eslint-disable-next-line no-undef
// it('test route to get actions', () => frisby
//     .post('http://localhost:3000/api/actions/')
//     .expect('status', 200)
// )

// // eslint-disable-next-line no-undef
// it('test route to get desk', () => frisby
//     .post('http://localhost:3000/api/desks/0123456789p1')
//     .expect('status', 200)
// )

// eslint-disable-next-line no-undef
it('test route to get subject managers', () => frisby
    .post('http://localhost:3000/api/subject-manager')
    .expect('status', 200)
    .then(console.log)
)

// eslint-disable-next-line no-undef
it('test route to get subject manager', () => frisby
    .post('http://localhost:3000/api/subject-manager/0123456789p1')
    .expect('status', 200)
    .then(console.log)
)

// eslint-disable-next-line no-undef
it('test route to get appointments', () => frisby
    .post('http://localhost:3000/api/subject-manager/0123456789p1/appointments')
    .expect('status', 200)
    .then(console.log)
)

// eslint-disable-next-line no-undef
it('test route to add appointment', () => frisby
    .post('http://localhost:3000/api/subject-manager/0123456789p1/appointments')
    .expect('status', 201)
    .then(console.log)
)

// eslint-disable-next-line no-undef
it('test route to delete appointment', () => frisby
    .post('http://localhost:3000/api/subject-manager/0123456789p1/appointments/0123456789a1')
    .expect('status', 200)
    .then(console.log)
)

// eslint-disable-next-line no-undef
it('test route to get queues', () => frisby
    .post('http://localhost:3000/api/queues/')
    .expect('status', 200)
    .then(console.log)
)

// eslint-disable-next-line no-undef
it('test route to get queue', () => frisby
    .post('http://localhost:3000/api/queues/0123456789q1')
    .expect('status', 200)
    .then(console.log)
)

// eslint-disable-next-line no-undef
it('test route to add queue', () => frisby
    .post('http://localhost:3000/api/queues/')
    .expect('status', 201)
    .then(console.log)
)

// eslint-disable-next-line no-undef
it('test route to get tickets from queue', () => frisby
    .post('http://localhost:3000/api/queues/0123456789q1/tickets')
    .expect('status', 200)
    .then(console.log)
)

// eslint-disable-next-line no-undef
it('test route to delete queue', () => frisby
    .post('http://localhost:3000/api/queues/0123456789q1')
    .expect('status', 200)
    .then(console.log)
)

// eslint-disable-next-line no-undef
it('test route to get number of people waiting', () => frisby
    .get('http://localhost:3000/api/tickets/')
    .expect('status', 200)
    .then(console.log)
)

// eslint-disable-next-line no-undef
it('test route to get ticket', () => frisby
    .get('http://localhost:3000/api/queues/0123456789q2/tickets')
    .expect('status', 200)
    .then(console.log)
)

// eslint-disable-next-line no-undef
it('test route to add new ticket waiting', () => frisby
    .post('http://localhost:3000/api/queues/0123456789q2/tickets')
    .expect('status', 200)
    .then(console.log)
)

// eslint-disable-next-line no-undef
it('test route to add remove ticket waiting', () => frisby
    .put('http://localhost:3000/api/queues/0123456789q2/tickets')
    .expect('status', 200)
    .then(console.log)
)

// // eslint-disable-next-line no-undef
// it('test route to add remove ticket ', () => frisby
//     .put('http://localhost:3000/api/queues/0123456789q2/tickets')
//     .expect('status', 200)
// )

afterAll(() => server.shutdown(srv))




