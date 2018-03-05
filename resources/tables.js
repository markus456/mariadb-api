var maria = require('../lib/mysql-promised.js')

const id = 'CONCAT(TABLE_SCHEMA, ".", TABLE_NAME)'
const query = 'SELECT ' + id + ' AS id, Table_Catalog, Table_Schema, Table_Name, Table_Type, Engine, Version, Row_Format, Table_Rows, Avg_Row_Length, Data_Length, Max_Data_Length, Index_Length, Data_Free, Auto_Increment, Create_Time, Update_Time, Check_Time, Table_Collation, Checksum, Create_Options, Table_Comment FROM information_schema.tables'
const column_query = 'SELECT Column_Name, Ordinal_Position, Column_Default, Is_Nullable, Data_Type, Character_Maximum_Length, Character_Octet_Length, Numeric_Precision, Numeric_Scale, Datetime_Precision, Character_Set_Name, Collation_Name, Column_Type, Column_Key, Extra, Privileges, Column_Comment, Is_Generated, Generation_Expression FROM information_schema.columns WHERE Table_Schema = ? AND Table_Name = ?'
const partition_query = 'SELECT Partition_Name, Subpartition_Name, Partition_Ordinal_Position, Subpartition_Ordinal_Position, Partition_Method, Subpartition_Method, Partition_Expression, Subpartition_Expression, Partition_Description, Table_Rows, Avg_Row_Length, Data_Length, Max_Data_Length, Index_Length, Data_Free, Create_Time, Update_Time, Check_Time, Checksum, Partition_Comment, Nodegroup, Tablespace_Name FROM information_schema.partitions WHERE Table_Schema = ? AND Table_Name = ?'

exports.type = 'tables'

function doRequest(q, param) {
    return maria.query(q, param)
        .then((res) => {
            return Promise.all(res.map((r) => {
                return maria.query(column_query, [r.Table_Schema, r.Table_Name])
                    .then((col_res) => r.columns = col_res)
                    .then(() => maria.query(partition_query, [r.Table_Schema, r.Table_Name]))
                    .then((part_res) => r.partitions = part_res)
            }))
                .then(() => res)
        })
}

exports.collection = () => {
    return doRequest(query)
}

exports.resource = (resource) => {
    return doRequest(query + ' WHERE ' + id + ' = ? LIMIT 1', [resource])
}
