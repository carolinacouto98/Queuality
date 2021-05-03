'use strict'

const { ObjectID } = require('bson')
const frisby = require('frisby')
const mongodb = require('mongo-mock')

mongodb.max_delay = 0
const MongoClient = mongodb.MongoClient
MongoClient.persist='mongo.js'

const url = 'mongodb://localhost:27017/queualitymock'

require('./../lib/repo/queuality-db.js')

MongoClient.connect(url, {}, function(err, client) {
    const db = client.db()
    // Get the documents collection
    const colEmployee = db.collection('employee-mock')
    const employees = [ 
        {
            'name' : 'Nuno Cardeal',
            'password' : 'PassNuno',
            'roles' : []
        },{
            'name' : 'Joana Campos',
            'password' : 'PassJoana',
            'roles' : []
        },{
            'name' : 'Carolina Couto',
            'password' : 'PassCarol',
            'roles' : ['admininstrator']
        }
    ]
    colEmployee.insertMany(employees, function(err, result) {
        console.log('inserted', result)
    })    

    const colQueue = db.collection('queue-mock')
    const queues = [
        {
            'name' : 'Queue1',
            'priority' : 'true',
            'subject' : 'Subject1'
        },{
            'name' : 'Queue2',
            'priority' : 'false',
            'subject' : 'Subject2'
        },{
            'name' : 'Queue3',
            'priority' : 'false',
            'subject' : 'Subject3'
        }
    ]
    
    colQueue.insertMany(queues, function(err, result) {
        console.log('inserted', result)
    })

    const colAppointment = db.collection('appointment-mock')
    const appointments = [
        {
            'desk' : 'Posto1',
            'subject' : 'Subject1',
            'duration' :'00:30:00',
            'appointments' : [{
                'id' : ObjectID(),
                'date' : '05/07/2021'
            }],
        },
        {
            'desk' : 'Posto2',
            'subject' : 'Subject2',
            'duration' :'00:20:00',
            'appointments' : [{
                'id' : ObjectID(),
                'date' : '05/07/2021'
            }],
        }
    ]
    colAppointment.insertMany(appointments, function(err, result) {
        console.log('inserted', result)
    })
})

// eslint-disable-next-line no-undef
it('test route to get employees', () => frisby
    .get('http://localhost:3000/api/employees')
    .expect('status', 200)
)

// eslint-disable-next-line no-undef
it('test route to get employee', () => frisby
    .get('http://localhost:3000/api/employees/608e8b6fb16b8953cce719ad')
    .expect('status', 200)
)

// eslint-disable-next-line no-undef
it('test route to add employee', () => frisby
    .post('http://localhost:3000/api/employees/')
    .expect('status', 201)
)

// eslint-disable-next-line no-undef
it('test route to delete employee', () => frisby
    .post('http://localhost:3000/api/employees/608e8b6fb16b8953cce719ad')
    .expect('status', 200)
)

// eslint-disable-next-line no-undef
it('test route to get subjects', () => frisby
    .post('http://localhost:3000/api/subjects/')
    .expect('status', 200)
)

// eslint-disable-next-line no-undef
it('test route to add subject', () => frisby
    .post('http://localhost:3000/api/subjects/')
    .expect('status', 201)
)

// eslint-disable-next-line no-undef
it('test route to delete subject', () => frisby
    .post('http://localhost:3000/api/subjects/608e8b6fb16b8953cce719b4')
    .expect('status', 200)
)

// eslint-disable-next-line no-undef
it('test route to get actions', () => frisby
    .post('http://localhost:3000/api/actions/')
    .expect('status', 200)
)

// eslint-disable-next-line no-undef
it('test route to get desk', () => frisby
    .post('http://localhost:3000/api/desks/608e8b6fb16b8953cce719b3')
    .expect('status', 200)
)

// eslint-disable-next-line no-undef
it('test route to get appointments', () => frisby
    .post('http://localhost:3000/api/appointments/')
    .expect('status', 200)
)

// eslint-disable-next-line no-undef
it('test route to get appointment', () => frisby
    .post('http://localhost:3000/api/appointments/608e8b6fb16b8953cce719b3')
    .expect('status', 200)
)

// eslint-disable-next-line no-undef
it('test route to add appointment', () => frisby
    .post('http://localhost:3000/api/appointments/')
    .expect('status', 201)
)

// eslint-disable-next-line no-undef
it('test route to delete appointment', () => frisby
    .post('http://localhost:3000/api/appointments/608e8b6fb16b8953cce719b3')
    .expect('status', 200)
)

// eslint-disable-next-line no-undef
it('test route to get queues', () => frisby
    .post('http://localhost:3000/api/queues/')
    .expect('status', 200)
)

// eslint-disable-next-line no-undef
it('test route to get queue', () => frisby
    .post('http://localhost:3000/api/queues/608e8b6fb16b8953cce719b0')
    .expect('status', 200)
)

// eslint-disable-next-line no-undef
it('test route to add queue', () => frisby
    .post('http://localhost:3000/api/queues/')
    .expect('status', 201)
)

// eslint-disable-next-line no-undef
it('test route to get tickets from queue', () => frisby
    .post('http://localhost:3000/api/queues/608e8b6fb16b8953cce719b0/tickets')
    .expect('status', 200)
)

// eslint-disable-next-line no-undef
it('test route to delete queue', () => frisby
    .post('http://localhost:3000/api/queues/608e8b6fb16b8953cce719b0')
    .expect('status', 200)
)

// eslint-disable-next-line no-undef
it('test route to get number of people waiting', () => frisby
    .get('http://localhost:3000/api/tickets/')
    .expect('status', 200)
)

// eslint-disable-next-line no-undef
it('test route to get ticket', () => frisby
    .get('http://localhost:3000/api/queues/:queueId/tickets')
    .expect('status', 200)
)

// eslint-disable-next-line no-undef
it('test route to add new ticket waiting', () => frisby
    .post('http://localhost:3000/api/queues/:queueId/tickets')
    .expect('status', 200)
)

// eslint-disable-next-line no-undef
it('test route to add remove ticket waiting', () => frisby
    .put('http://localhost:3000/api/queues/:queueId/tickets')
    .expect('status', 200)
)

// eslint-disable-next-line no-undef
it('test route to add remove ticket ', () => frisby
    .put('http://localhost:3000/api/queues/:queueId/tickets')
    .expect('status', 200)
)






