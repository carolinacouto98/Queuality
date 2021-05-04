var ObjectID = require('bson-objectid');

module.exports = {
  "localhost:27017": {
    "databases": {
      "queualitymock": {
        "collections": [
          {
            "name": "system.namespaces",
            "documents": [
              {
                "name": "system.indexes"
              }
            ]
          },
          {
            "name": "system.indexes",
            "documents": []
          }
        ]
      },
      "undefined": {
        "collections": [
          {
            "name": "system.namespaces",
            "documents": [
              {
                "name": "system.indexes"
              },
              {
                "name": "employee-mock"
              },
              {
                "name": "queue-mock"
              },
              {
                "name": "appointment-mock"
              }
            ]
          },
          {
            "name": "system.indexes",
            "documents": [
              {
                "v": 1,
                "key": {
                  "_id": 1
                },
                "ns": "undefined.employee-mock",
                "name": "_id_",
                "unique": true
              },
              {
                "v": 1,
                "key": {
                  "_id": 1
                },
                "ns": "undefined.queue-mock",
                "name": "_id_",
                "unique": true
              },
              {
                "v": 1,
                "key": {
                  "_id": 1
                },
                "ns": "undefined.appointment-mock",
                "name": "_id_",
                "unique": true
              }
            ]
          },
          {
            "name": "employee-mock",
            "documents": [
              {
                "name": "Nuno Cardeal",
                "password": "PassNuno",
                "roles": [],
                "_id": ObjectID("608e8b6fb16b8953cce719ad")
              },
              {
                "name": "Joana Campos",
                "password": "PassJoana",
                "roles": [],
                "_id": ObjectID("608e8b6fb16b8953cce719ae")
              },
              {
                "name": "Carolina Couto",
                "password": "PassCarol",
                "roles": [
                  "admininstrator"
                ],
                "_id": ObjectID("608e8b6fb16b8953cce719af")
              }
            ]
          },
          {
            "name": "queue-mock",
            "documents": [
              {
                "name": "Queue1",
                "priority": "true",
                "subject": "Subject1",
                "_id": ObjectID("608e8b6fb16b8953cce719b0")
              },
              {
                "name": "Queue2",
                "priority": "false",
                "subject": "Subject2",
                "_id": ObjectID("608e8b6fb16b8953cce719b1")
              },
              {
                "name": "Queue3",
                "priority": "false",
                "subject": "Subject3",
                "_id": ObjectID("608e8b6fb16b8953cce719b2")
              }
            ]
          },
          {
            "name": "appointment-mock",
            "documents": [
              {
                "desk": "Posto1",
                "subject": "Subject1",
                "duration": "00:30:00",
                "appointments": [
                  {
                    "id": "608e8b6fe8d05a120bb02846",
                    "date": "05/07/2021"
                  }
                ],
                "_id": ObjectID("608e8b6fb16b8953cce719b3")
              },
              {
                "desk": "Posto2",
                "subject": "Subject2",
                "duration": "00:20:00",
                "appointments": [
                  {
                    "id": "608e8b6fe8d05a120bb02847",
                    "date": "05/07/2021"
                  }
                ],
                "_id": ObjectID("608e8b6fb16b8953cce719b4")
              }
            ]
          }
        ]
      }
    }
  }
}