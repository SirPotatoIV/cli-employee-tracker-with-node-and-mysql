// Dependencies
// =============================================================
// Makes creating tables to console.log easier.
const cTable = require("console.table");
const inquirer = require("inquirer")
// Models
const Employees = require("./models/employees.js");
const Roles = require("./models/roles.js");
const Departments = require("./models/departments.js");

// object used to reference the models with strings.
const tables = {
    Employees,
    Roles,
    Departments
}

async function mainPrompt(){
    const view = "View data from a table";
    const add = "Add data to a table";
    const update = "Update Employee Role";
    const exit = "Exit app";
    
    const userSelection =  await inquirer
        .prompt({
            type: "list",
            name: "option",
            message: "What would you like to do?",
            choices: [view, add, update, exit]
        });

    switch(userSelection.option){
        case view: 
            viewData()
            break
        case add:
            addData()
            break
        case update:
            updateData()
            break
        case exit:
            return;
    }
}
// mainPrompt();

// View a table
// -- First prompts user
// -- Second queries data
// -- Calls the displayData function
async function viewData(){
    // Asks user what table they want to view.
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
// findData()

async function addData(){
    const result = await Departments.create({
        title: "Regulatory"
    })
    console.log(result);
}
addData()


// Display data from the database to the console in a table format
function displayData(dataToDisplay){
    const formattedData = cTable.getTable(dataToDisplay);
          
    console.log(formattedData);
    mainPrompt();
}