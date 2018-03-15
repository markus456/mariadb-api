// Based off of: https://github.com/shlomi-noach/common_schema/blob/master/views/schema_analysis/no_pk_innodb_tables.sql
// Which is released under MIT License, Copyright (c) 2016 Shlomi Noach

var maria = require('../lib/mysql-promised.js')
const id = 'CONCAT(TABLES.TABLE_SCHEMA, ".", TABLES.TABLE_NAME)'
const query = "SELECT " + id + " AS id, TABLES.ENGINE, GROUP_CONCAT( IF(CONSTRAINT_TYPE='UNIQUE', CONSTRAINT_NAME, NULL) ) AS candidate_keys FROM INFORMATION_SCHEMA.TABLES LEFT JOIN INFORMATION_SCHEMA.TABLE_CONSTRAINTS USING(TABLE_SCHEMA, TABLE_NAME) WHERE TABLES.ENGINE='InnoDB' GROUP BY TABLES.TABLE_SCHEMA, TABLES.TABLE_NAME, TABLES.ENGINE HAVING IFNULL( SUM(CONSTRAINT_TYPE='PRIMARY KEY'), 0 ) = 0;"

exports.type = 'innodb_no_pk_tables'

exports.collection = () => {
    return maria.query(query)
}

exports.resource = (resource) => {
    return maria.query(query + ' WHERE ' + id + ' = ?', [resource])
}
