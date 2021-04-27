'use strict'

let db
let col

const getAll = () => col.find({})

const get = (_field, id, projection) => col.findOne({_field : id}, projection)

const insert = (document) => col.findOneAndUpdate(document, {upsert : true, returnNewDocument : true})

const update = (idObj, object) => col.findOneAndUpdate(idObj, object)

const del = (id) => col.deleteOne(id)

module.exports = function(database, collection) {
    db = database
    col = db.collection(collection)
    return {getAll, get, insert, update, del}
} 