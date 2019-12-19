// Dependencies
// =============================================================
// Makes creating tables to console.log easier.
const cTable = require("console.table");
const inquirer = require("inquirer")
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
async function findData(){
    const tableSelected =  await inquirer
        .prompt({
            type: "list",
            name: "option",
            message: "What would you like to view?",
            choices: ["Employees", "Roles", "Departments"]
        });
    
    const foundData = await tables[tableSelected.option].findAll({ raw: true })
        // console.log("All employees:", JSON.stringify(employees, null, 4));
        // const data = JSON.stringify(employees);
        displayData(foundData)
     
}
findData()

// Display data from the database to the console in a table format
function displayData(dataToDisplay){
    const table = cTable.getTable(dataToDisplay);
          
    console.log(table);
    
}