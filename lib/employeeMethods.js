const databaseMethods = require("./databaseMethods")

class employeeMethods extends databaseMethods {
  constructor(firstName, lastName, roleId, managerId) {
    super(firstName, lastName, roleId, managerId)
    this.table = "employees";
    this.firstName = firstName;
    this.lastName = lastName;
    this.roleId = roleId;
    this.managerId = managerId;

    this.addSql = `INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES("${this.firstName}", "${this.lastName}", "${this.roleId}", "${this.managerId}")`
  }
}

module.exports = employeeMethods;