const databaseMethods = require("./databaseMethods")

class departmentMethods extends databaseMethods {
  constructor() {
    super()
        this.table = "roles";
  }

  static addData(connection, departmentName){
    // http://www.mysqltutorial.org/mysql-nodejs/insert/
    // insert statment
    let sql = `INSERT INTO departments (name)
    VALUES (${departmentName});` 

    // execute the insert statment
    connection.query(sql);

    connection.end();
  }
}
module.exports = departmentMethods;