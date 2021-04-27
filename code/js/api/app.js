'use strict'

const queualityDb = require('./lib/repo/queuality-db.js')
const assert = require('assert')

const MongoClient = require('mongodb').MongoClient

const url = 'mongodb://localhost:27017'

const dbName = 'queuality'
const client = new MongoClient(url, { useUnifiedTopology: true })

client.connect(function(err) {
    assert.strictEqual(null, err)

    console.log('Connected successfully to server')

    const db = client.db(dbName)
    queualityDb.insertDocuments(db, function() {
        queualityDb.findDocuments(db, function() {
            client.close();
        })
    })
})