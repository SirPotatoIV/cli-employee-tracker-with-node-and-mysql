// Dependencies
// =============================================================
// Makes creating tables to console.log easier.
const cTable = require("console.table");
// Models
const Employees = require("./models/employees.js");
const Roles = require("./models/roles.js");
const Departments = require("./models/departments.js");

const tables = {
    Employees,
    Roles,
    Departments
}

// View a table
async function findData(table){
   const foundData = await tables[table].findAll({ raw: true })
        // console.log("All employees:", JSON.stringify(employees, null, 4));
        // const data = JSON.stringify(employees);
        displayData(foundData)
     
}
findData("Employees")

// Display data from the database to the console in a table format
function displayData(dataToDisplay){
    const table = cTable.getTable(dataToDisplay);
          
    console.log(table);
    
}