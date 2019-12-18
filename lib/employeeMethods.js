const databaseMethods = require("./databaseMethods")

class employeeMethods extends databaseMethods {
  constructor() {
    super()
    this.table = "employees";
  }

  static addData(connection, firstName, lastName, roleId, managerId){
    // http://www.mysqltutorial.org/mysql-nodejs/insert/
    // insert statment
    let sql = `INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES("${firstName}", "${lastName}", "${roleId}", "${managerId}")`

    // execute the insert statment
    connection.query(sql);

    connection.end();
}
}

module.exports = employeeMethods;