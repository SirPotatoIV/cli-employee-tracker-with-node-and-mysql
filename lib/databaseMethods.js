// const mysql = require("mysql");
const cTable = require("console.table");

class databaseMethods {
    constructor(table) {
        this.table = table;
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

}

// const employeeMethods = new databaseMethods("employees")
  
// console.log(employeeMethods);

module.exports = databaseMethods;