// const mysql = require("mysql");
const cTable = require("console.table");

class databaseMethods {
    constructor() {
        this.table = "";
        this.addSql = "";
    }
    
    getData(connection){
        connection.query(`SELECT * FROM ${this.table}`, function(err, res) {
            if (err) throw err;
            //   console.log(res);
            connection.end();
            // console.log(res);
            const tableToDisplay = cTable.getTable(res);
    
        console.log(tableToDisplay);
        });
    }

    static addData(connection){
        // http://www.mysqltutorial.org/mysql-nodejs/insert/
        // insert statment
        let sql = this.addSql 
    
        // execute the insert statment
        connection.query(sql);
    
        connection.end();
    }

    static updateData(connection, dataToChange, newData, dataLocation, dataLocationValue){
        // http://www.mysqltutorial.org/mysql-nodejs/update/
        // update statment
        let sql = `UPDATE ${this.table}
        SET ${dataToChange} = "${newData}"
        WHERE ${dataLocation} = "${dataLocationValue}"`;

        // execute the UPDATE statement
        connection.query(sql, (error, results, fields) => {
        if (error){
        return console.error(error.message);
        }
        console.log('Rows affected:', results.affectedRows);
        });
       
        connection.end();

    }
}

// const employeeMethods = new databaseMethods("employees")
  
// console.log(employeeMethods);

module.exports = databaseMethods;