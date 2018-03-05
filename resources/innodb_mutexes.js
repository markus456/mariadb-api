var maria = require('../lib/mysql-promised.js')
const id = 'CONCAT(Create_File, ".", Create_Line)'
const mutexes_query = 'SELECT ' + id + 'AS id, Name, Create_File, Create_Line, Os_Waits FROM information_schema.innodb_mutexes'

exports.type = 'innodb_mutexes'

exports.collection = () => {
    return maria.query(mutexes_query)
}

exports.resource = (resource) => {
    return maria.query(mutexes_query + ' WHERE ' + id + ' = ?', [resource])
}
