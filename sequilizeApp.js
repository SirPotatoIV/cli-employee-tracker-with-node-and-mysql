// Dependencies
// -- Makes creating tables to console.log easier
const cTable = require("console.table");
// -- Used to prompt the user
const inquirer = require("inquirer")
// -- Used to sync the database in this js file
const sequelize = require("./config/connection")
// -- Models 
const Employees = require("./models/employees.js");
const Roles = require("./models/roles.js");
const Departments = require("./models/departments.js");
// Object used to reference the models with strings, which correspond to each table in the database
const tables = {
    Employees,
    Roles,
    Departments
}

// First function called to start the entire app
// -- full database displayed in the conosole
// -- user is prompted for what they would like to do
// -- user request is used to call the corresponding function
async function mainPrompt(){
    // Updates the database since the connection will not stop after a user completes an update or add to the table
    await sequelize.sync()
    //Used to display one table of all data at the beginning
    const joinedData = await sequelize.query(`SELECT employees.id, employees.first_name, employees.last_name, employees.manager_id, employees.role_id, roles.title AS role_title, roles.salary, departments.title AS department_title FROM employees, roles, departments WHERE roles.id = employees.role_id AND roles.department_id = departments.id ORDER BY employees.id`, {type: sequelize.QueryTypes.SELECT})
    const joinedDataTable = cTable.getTable(joinedData)
    console.log(joinedDataTable)

    // Questions for main prompt stated as variables for ease of reading and reduction of error.
    const view = "View data from a table";
    const add = "Add data to a table";
    const update = "Update Employee Role";
    const exit = "Exit app";
    
    // Prompting user to figure out what they want to do.
    const userSelection =  await inquirer
        .prompt({
            type: "list",
            name: "option",
            message: "What would you like to do?",
            choices: [view, add, update, exit]
        });

    // Based on user answer, the switch calls the respective function. Each function contains additional prompts.
    switch(userSelection.option){
        case view: 
            viewTable()
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
async function viewTable(table){
   let tableSelected = "";
   // If another functions is trying to view a table 
    if(table){
        tableSelected = table;
    }
    // Asks user what table they want to view.
   else { answer =  await inquirer
        .prompt({
            type: "list",
            name: "tableSelected",
            message: "What would you like to view?",
            choices: ["Employees", "Roles", "Departments"]
        });

        tableSelected = answer.tableSelected;
        
    }
        
    
    const foundData = await tables[tableSelected].findAll({ raw: true })
    // Calls function that uses cTable.
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
// -- Get list of employees
// -- Prompt user to find out which employee they would like to update the role of
// -- Prompt the user what the new role_id should be.
// -- Update the user's role_id
async function updateData(){
    
    // Get list of employees
    const usersList = await Employees.findAll(
        {   
            attributes: ["id", "first_name", "last_name"],
            raw: true
        })
    
    const usersListString = [];
    
    for(let i = 0; i < usersList.length; i++){
        const {id, first_name, last_name} = usersList[i];
        const employeeInfo = `${id} ${first_name} ${last_name}`;
        usersListString.push(employeeInfo)
    }

    // Ask user what employee they would like to update
    const employeeToUpdate = await inquirer
        .prompt({
            type: "list",
            name: "selected",
            message: "Please select the employee who you want to update.",
            choices: usersListString
        })
    const indexOfSelected = usersListString.indexOf(employeeToUpdate.selected)
    // Ask user for new value of attribute they would like to change
    const newRole = await inquirer
        .prompt({
            type: "input",
            name: "role_id",
            message: `What is ${employeeToUpdate.selected}'s new role id?`
        })
    
    Employees.update(
        {
            role_id: newRole.role_id,
        }, 
        {
            where: {id : usersList[indexOfSelected].id}
        });
      console.log(`${employeeToUpdate.selected} role updated!`)
      mainPrompt()

}

// Display data from the database to the console in a table format
function displayData(dataToDisplay){
    
    const formattedData = cTable.getTable(dataToDisplay);
    console.log(formattedData);
    mainPrompt();
}