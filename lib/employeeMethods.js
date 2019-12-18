const databaseMethods = require("./databaseMethods")

class employeeMethods extends databaseMethods {
  constructor() {
    super()
    this.table = "employees";
    this.addPrompts = [{
      type: "input",
      name: "firstName",
      message: "What is the employee's first name?"
    },
    {
      type: "input",
      name: "lastName",
      message: "What is the employee's last name?"
    },
    {
      type: "input",
      name: "roleId",
      message: "What is the employee's role id?"
    },
    {
      type: "input",
      name: "managerId",
      message: "What is the employee's manager id?"
    }
    ]
  }
  
  static addPrompts = [{
      type: "input",
      name: "firstName",
      message: "What is the employee's first name?"
    },
    {
      type: "input",
      name: "lastName",
      message: "What is the employee's last name?"
    },
    {
      type: "input",
      name: "roleId",
      message: "What is the employee's role id?"
    },
    {
      type: "input",
      name: "managerId",
      message: "What is the employee's manager id?"
    }]

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