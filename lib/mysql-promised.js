var fs = require('fs')
exports.config = JSON.parse(fs.readFileSync('config.json'))

var mysql = require('mysql')
var connection = mysql.createConnection({
    host     : exports.config.host,
    user     : exports.config.user,
    password : exports.config.password,
    port     : exports.config.port,
    database : 'mysql'
});

exports.query = function(query, params) {
    return new Promise((resolve, reject) => {

        connection.query(query, params, function (error, results, fields) {
            if (error) {
                reject(error)
            } else {
                resolve(results, fields);
            }
        })
    })
}
