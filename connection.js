const mysql = require('mysql');

const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'gps'
});

conn.connect((err) => {
    if (err) throw err
    console.log("connected to database");
});

let insert = (table, data, callback) => {
    let sql = "INSERT INTO " + table + " SET ?";
    conn.query(sql, data, (err, results) => {
        if (err) {
            let data = {
                status: 0,
                data: null,
                message: err.message
            }
            callback(data)
        } else {
            let data = {
                status: 1,
                data: results,
                message: "Successfully Inserted!"
            }
            callback(data)
        }
    });
}

let select = (table, column, condition, callback) => {
    let sql = "SELECT " + column + " FROM " + table + " WHERE " + condition;
    conn.query(sql, (err, results) => {
        if (err) {
            let data = {
                status: 0,
                data: null,
                message: "Something went wrong!"
            }
            callback(data)
        } else {
            let data = {
                status: 1,
                data: results,
                message: "Success"
            }
            callback(data)
        }
    });
}

let update = (table, data, condition, callback) => {
    let query = "UPDATE " + table + " SET ? WHERE " + condition
    conn.query(query, data,(err, results) => {
        
            if (err) {
                let data = {
                    status: 0,
                    data: null,
                    message: err.message
                }
                callback(data)
            } else {
                let data = {
                    status: 1,
                    data: results,
                    message: "Successfully Updated!"
                }
                callback(data)
            }
        
    })
}

let customQuery = (query, callback) => {
    conn.query(query, (err, results) => {
        if (err) {
            let data = {
                status: 0,
                data: null
            }
            callback(data)
        } else {
            let data = {
                status: 1,
                data: results
            }
            callback(data)
        }
    });
}
module.exports = {
    insert,
    select,
    customQuery,
    update
}