// Dependencies
// =============================================================
// Makes creating tables to console.log easier.
const cTable = require("console.table");
// Models
const Employees = require("./models/employees.js");
const Roles = require("./models/roles.js");
const Departments = require("./models/departments.js");

// View a table
function findData(){
    Employees.findAll({ raw: true }).then(employees => {
        // console.log("All employees:", JSON.stringify(employees, null, 4));
        // const data = JSON.stringify(employees);
        const table = cTable.getTable(employees);
          
          console.log(table);
      });
}
findData()

// Display data from the database to the console in a table format
function displayData(data){

    
}