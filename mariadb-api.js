var maria = require('./lib/mysql-promised.js')
var app = require('express')()
const ver = '/v1/'

const Presenter = require('yayson')({
    adapter: 'default'
}).Presenter;


var resources = [
    './resources/users.js',
    './resources/tables.js',
    './resources/variables.js',
    './resources/innodb_metrics.js',
    './resources/innodb_mutexes.js',
    './resources/innodb_no_pk_tables.js',
    './resources/redundant_keys.js',
    './resources/partitions.js',
]

types = []

resources.forEach((i) => {
    var mod = require(i)
    class JSONPresenter extends Presenter {};
    JSONPresenter.prototype.type = mod.type;
    types.push({id: mod.type})

    if (mod.collection) {
        app.get(ver + mod.type, (req, res) => {
            mod.collection()
                .then((results) => {
                    res.send(JSON.stringify(JSONPresenter.render(results), null, 4))
                })
                .catch((err) => {
                    res.send(err)
                })
        })
    }

    if (mod.resource) {
        app.get(ver + mod.type + '/:id', (req, res) => {
            mod.resource(req.params.id)
                .then((results) => {
                    if (results && results.length > 0) {
                        res.send(JSON.stringify(JSONPresenter.render(results[0]), null, 4))
                    } else {
                        res.status(404).send()
                    }
                })
                .catch((err) => {
                    res.send(err)
                })
        })
    }
})

// Add collection that describes all endpoints
app.get(ver + 'endpoints', (req, res) => {
    types.forEach((i) => {
        i.url = 'http://' + req.hostname + ':' + maria.config.listen + '/v1/' + i.id
    })

    class EndpointPresenter extends Presenter {}
    EndpointPresenter.prototype.type = 'endpoints'
    res.send(JSON.stringify(EndpointPresenter.render(types), null, 4))
})

app.listen(maria.config.listen, () => console.log('API listening on port ' + maria.config.listen))
