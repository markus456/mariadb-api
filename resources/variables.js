var maria = require('../lib/mysql-promised.js')
const id = 'LOWER(Variable_Name)'
const query = 'SELECT ' + id + ' AS id, Global_value, Global_Value_Origin, Default_Value, Variable_Scope, Variable_Type, Variable_Comment, Numeric_Min_Value, Numeric_Max_Value, Numeric_Block_Size, Enum_Value_List, Read_Only, Command_Line_Argument FROM information_schema.system_variables'

exports.type = 'variables'

exports.collection = () => {
    return maria.query(query)
}

exports.resource = (resource) => {
    return maria.query(query + ' WHERE ' + id + ' = ? LIMIT 1', [resource])
}
