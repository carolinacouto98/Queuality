'use strict'

let db

const MongoClient = require('mongodb').MongoClient

const getAll = (col, key) => {
    if (!key )
        return db.collection(col).find().toArray()
    return db.collection(col).find(key).toArray()
}

const get = (col, id, projection) => db.collection(col).findOne({_id: id}, projection)

const getByProperties = (col, object, projection) => db.collection(col).findOne(object, projection)

const insert = (col, document) => db.collection(col)
    .findOneAndUpdate(document, { $set : document }, { returnOriginal: false, upsert: true })
    .then(res => res.value)

const update = (col, id, object) => db.collection(col)
    .findOneAndUpdate({_id : id}, { $set : object }, {returnOriginal: false })
    .then(res => res.value)

const updateInc = (col, id, object) => db.collection(col)
    .findOneAndUpdate({_id : id}, {$inc : object},  { returnOriginal: false, upsert: true })
    .then(res => res.value)

const del = (col, id) => db.collection(col).deleteOne({_id : id})

module.exports = {
    connection: async (url, dbName) => {
        if(!url) throw Error('You should pass an url.')
        const client = await MongoClient.connect(`${url}/${dbName}`, { useUnifiedTopology: true })
        db = client.db()
        console.log('Connected successfully to database.')
        return await client
    }, 
    methods: {getAll, get, getByProperties, insert, update, updateInc, del}
}