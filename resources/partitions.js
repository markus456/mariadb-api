var maria = require('../lib/mysql-promised.js')
const id = 'CONCAT(TABLE_SCHEMA, ".", TABLE_NAME)'
const query = 'SELECT ' + id + ' AS id, Partition_Name, Subpartition_Name, Partition_Ordinal_Position, Subpartition_Ordinal_Position, Partition_Method, Subpartition_Method, Partition_Expression, Subpartition_Expression, Partition_Description, Table_Rows, Avg_Row_Length, Data_Length, Max_Data_Length, Index_Length, Data_Free, Create_Time, Update_Time, Check_Time, Checksum, Partition_Comment, Nodegroup, Tablespace_Name FROM information_schema.partitions'

exports.type = 'partitions'

exports.collection = () => {
    return maria.query(query)
}

exports.resource = (resource) => {
    return maria.query(query + ' WHERE ' + id + ' = ? LIMIT 1', [resource])
}
