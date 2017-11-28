const fs = require('fs')

let database_file = ''
let database = {
    _ids: {}
}

let operations = {}

function next_id(tablename) {
    if (database._ids[tablename])
        return ++database._ids[tablename]
    else {
        database._ids[tablename] = 1

        return 1
    }
}

operations.connect = function (dbname) {
    fs.open(dbname, 'w+', function (err, file) {
        if (err)
            throw err

        database_file = dbname
        database = JSON.parse(file)
    })
}

operations.create = function (tablename) {
    database[tablename] = {}

    sync()
}

operations.drop = function (tablename) {
    database[tablename] = undefined

    sync()
}

operations.all = function (tablename) {
    return database[tablename] || null
}

operations.get = function (tablename, id) {
    return database[tablename][id] || null
}

operations.where = function (tablename, wherefn) {
    return wherefn(database[tablename])
}

operations.insert = function (tablename, data) {
    database[tablename] = database[tablename] || {}

    database[tablename][next_id(tablename)] = data

    sync()
}

operations.update = function (tablename, id, new_data) {
    let previous_data = database[tablename][id]

    if (previous_data) {
        database[tablename][id] = new_data
    } else {
        return null
    }

    sync()
}

function sync() {
    fs.writeFile(database_file, JSON.stringify(database), 'utf8', function (err) {
        if (err) throw err
    })
}

module.exports = { ...operations, _data: database }