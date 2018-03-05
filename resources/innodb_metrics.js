var maria = require('../lib/mysql-promised.js')
const metrics_query = 'SELECT Name AS id, Subsystem, Count, Max_Count, Min_Count, Avg_Count, Count_Reset, Max_Count_Reset, Min_Count_Reset, Avg_Count_Reset, Time_Enabled, Time_Disabled, Time_Elapsed, Time_Reset, Status, Type, Comment FROM information_schema.innodb_metrics'
const id = 'Name'

exports.type = 'innodb_metrics'

exports.collection = () => {
    return maria.query(metrics_query)
}

exports.resource = (resource) => {
    return maria.query(metrics_query + ' WHERE ' + id + ' = ?', [resource])
}
