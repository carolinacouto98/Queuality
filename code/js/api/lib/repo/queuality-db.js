'use strict'


let col
let db

const MongoClient = require('mongodb').MongoClient
const ObjectId = require('mongodb').ObjectId

const getAll = () => db.collection(col).find().toArray()

const get = (id, projection) => db.collection(col).findOne({_id : ObjectId(id)}, projection)

const insert = (document) => db.collection(col).findOneAndUpdate(document, { $set : document }, { upsert : true, returnNewDocument : true })

const update = (id, object) => db.collection(col).findOneAndUpdate({_id : ObjectId(id)}, { $set : object })

const del = (id) => db.collection(col).deleteOne(ObjectId(id))

module.exports = {
    connection: async (url, dbName, callback) => {
        if(!url) return callback(Error('You should pass an url.'))
        const client = new MongoClient(url, { useUnifiedTopology: true })
        try {
            await client.connect()   
            console.log('Connected successfully to database.')
            db = client.db(dbName)
        }
        catch(e) {
            callback(e)
        }
        finally {
            //await client.close()
        }
    }, 
    collection: collection => {
        col = collection
        return {getAll, get, insert, update, del}
    } 
}