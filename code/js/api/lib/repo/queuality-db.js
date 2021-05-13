'use strict'

let db

const MongoClient = require('mongodb').MongoClient
const ObjectId = require('mongodb').ObjectId

const getAll = (col, key, projection) => {
    if (!key || !projection)
        return db.collection(col).find().toArray()
    return db.collection(col).find(key, projection).toArray()
}

const get = (col, id, projection) => db.collection(col).findOne({_id : ObjectId(id)}, projection)

const insert = (col, document) => {
    return db.collection(col).findOneAndUpdate(document, { $set : document }, { upsert : true, returnNewDocument : true })
        .then(result => 
            result.lastErrorObject.upserted)
}

const update = (col, id, object) => db.collection(col).findOneAndUpdate({_id : ObjectId(id)}, { $set : object })

const updateInc = (col, id, object) => db.collection(col).findOneAndUpdate({_id : ObjectId(id)}, object)

const del = (col, id) => db.collection(col).deleteOne({_id : ObjectId(id)})

module.exports = {
    connection: async (url, dbName) => {
        if(!url) throw Error('You should pass an url.')
        const client = await MongoClient.connect(`${url}/${dbName}`, { useUnifiedTopology: true })
        db = client.db()
        console.log('Connected successfully to database.')
        return await client
    }, 
    methods: {getAll, get, insert, update, updateInc, del}
}