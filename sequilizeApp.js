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
mainPrompt();

// View a table
// -- Prompts user to figure out what table they would like to view
// -- Query the database for the requested table
// -- Display the requested table using the displayData function
// -- Call main prompt to cause recursion 
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

// Add data to a table
// -- Prompt user to figure out what table they want to add data to
// -- Prompt user with data required for requested table
// -- Query the database to create a new row in the requested table with the provided data
// -- Call main prompt to cause recursion
async function addData(){
    // Contains questions pertaining to each table
    const tableQuestions = {
        Employees: [
            {
                type: "input",
                name: "first_name",
                message: "What is the Employees First Name?"
            },
            {
                type: "input",
                name: "last_name",
                message: "What is the Employees Last Name?" 
            },
            {
                type: "input",
                name: "role_id",
                message: "What is the Employees Role Id?"
            },
            {
                type: "input",
                name: "manager_id",
                message: "What is the Employees Manager Id?"
            }
        ],
        Roles: [
            {
                type: "input",
                name: "title",
                message: "What is the title of the role?"
            },
            {
                type: "input",
                name: "salary",
                message: "What is the salary for this role?",
                filter: function(input){
                    return parseInt(input)
                }
            },
            {
                type: "input",
                name: "department_id",
                message: "What is the department id for this role?",
                filter: function(input){
                    return parseInt(input)
                }
            }
        ],
        Departments: [
            {
                type: "input",
                name: "title",
                message: "What is the title of the department?"
            }
        ]
    }
    // Prompts the user to figure out what table they want to add data to
    const tableSelected =  await inquirer
        .prompt({
            type: "list",
            name: "option",
            message: "What table would you like to add to?",
            choices: ["Employees", "Roles", "Departments"]
        })
    // Requests values from the user to add to the selected table
    const rowValues = await inquirer
        .prompt(
            tableQuestions[tableSelected.option]
        )
    // Queries the server to add requested data to the selected table
    const result = await tables[tableSelected.option].create(rowValues)
    // Calls main prompt to cause recursion
    mainPrompt();

}

// Update employee role
async function updateData(){


}

// Display data from the database to the console in a table format
function displayData(dataToDisplay){
    const formattedData = cTable.getTable(dataToDisplay);

    mainPrompt();
}