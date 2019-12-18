const databaseMethods = require("./databaseMethods")

class roleMethods extends databaseMethods {
  constructor() {
    super()
        this.table = "roles";
  }

  static addData(connection, title, salary, departmentId){
    // http://www.mysqltutorial.org/mysql-nodejs/insert/
    // insert statment
    let sql = `INSERT INTO roles (title, salary, department_id) VALUES (${title}, ${salary}, ${departmentId});` 

    // execute the insert statment
    connection.query(sql);

    connection.end();
}
}

module.exports = roleMethods;