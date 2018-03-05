# mariadb-api

A tiny JSON API implementation for MariaDB.

## Endpoints

The current API consists of the following resource collection endpoints:

* `/v1/users`
* `/v1/tables`
* `/v1/variables`
* `/v1/innodb_metrics`
* `/v1/innodb_mutexes`

Each endpoint conforms to the [JSON API specification](http://jsonapi.org/format/).

## Installation

```
npm i
node mariadb-api.js
```

## Configuration

Update the values in `config.json` to your liking.

```javascript
{
    "user": "maxuser",    // User used to connect to the database
    "password": "maxpwd", // Password for the user
    "host": "127.0.0.1",  // Hostname of the database
    "port": 3306,         // Port where the database is listening
    "listen": 8080        // Post where the API will listen
}
```

## Example output

For the following SQL.

```sql
CREATE TABLE test.t1(id INT AUTO_INCREMENT PRIMARY KEY, data VARCHAR(80));
INSERT INTO test.t1(data) VALUES ("hello world");
SELECT * FROM test.t1;
```

The following resource is created.

```
[markusjm@localhost ~]$ curl localhost:8080/v1/tables/test.t1
{
    "data": {
        "id": "test.t1",
        "type": "tables",
        "attributes": {
            "Table_Catalog": "def",
            "Table_Schema": "test",
            "Table_Name": "t1",
            "Table_Type": "BASE TABLE",
            "Engine": "InnoDB",
            "Version": 10,
            "Row_Format": "Dynamic",
            "Table_Rows": 1,
            "Avg_Row_Length": 16384,
            "Data_Length": 16384,
            "Max_Data_Length": 0,
            "Index_Length": 0,
            "Data_Free": 0,
            "Auto_Increment": 2,
            "Create_Time": "2018-03-05T19:10:27.000Z",
            "Update_Time": "2018-03-05T19:10:40.000Z",
            "Check_Time": null,
            "Table_Collation": "latin1_swedish_ci",
            "Checksum": null,
            "Create_Options": "",
            "Table_Comment": "",
            "columns": [
                {
                    "Column_Name": "id",
                    "Ordinal_Position": 1,
                    "Column_Default": null,
                    "Is_Nullable": "NO",
                    "Data_Type": "int",
                    "Character_Maximum_Length": null,
                    "Character_Octet_Length": null,
                    "Numeric_Precision": 10,
                    "Numeric_Scale": 0,
                    "Datetime_Precision": null,
                    "Character_Set_Name": null,
                    "Collation_Name": null,
                    "Column_Type": "int(11)",
                    "Column_Key": "PRI",
                    "Extra": "auto_increment",
                    "Privileges": "select,insert,update,references",
                    "Column_Comment": "",
                    "Is_Generated": "NEVER",
                    "Generation_Expression": null
                },
                {
                    "Column_Name": "data",
                    "Ordinal_Position": 2,
                    "Column_Default": "NULL",
                    "Is_Nullable": "YES",
                    "Data_Type": "varchar",
                    "Character_Maximum_Length": 80,
                    "Character_Octet_Length": 80,
                    "Numeric_Precision": null,
                    "Numeric_Scale": null,
                    "Datetime_Precision": null,
                    "Character_Set_Name": "latin1",
                    "Collation_Name": "latin1_swedish_ci",
                    "Column_Type": "varchar(80)",
                    "Column_Key": "",
                    "Extra": "",
                    "Privileges": "select,insert,update,references",
                    "Column_Comment": "",
                    "Is_Generated": "NEVER",
                    "Generation_Expression": null
                }
            ],
            "partitions": [
                {
                    "Partition_Name": null,
                    "Subpartition_Name": null,
                    "Partition_Ordinal_Position": null,
                    "Subpartition_Ordinal_Position": null,
                    "Partition_Method": null,
                    "Subpartition_Method": null,
                    "Partition_Expression": null,
                    "Subpartition_Expression": null,
                    "Partition_Description": null,
                    "Table_Rows": 1,
                    "Avg_Row_Length": 16384,
                    "Data_Length": 16384,
                    "Max_Data_Length": null,
                    "Index_Length": 0,
                    "Data_Free": 0,
                    "Create_Time": "2018-03-05T19:10:27.000Z",
                    "Update_Time": "2018-03-05T19:10:40.000Z",
                    "Check_Time": null,
                    "Checksum": null,
                    "Partition_Comment": "",
                    "Nodegroup": "",
                    "Tablespace_Name": null
                }
            ]
        }
    }
}
```
