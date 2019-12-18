// import node modules
const inquirer = require("inquirer");
const mysql = require("mysql");
const cTable = require("console.table");
const employeeMethods = require("./lib/employeeMethods")
const roleMethods = require("./lib/roleMethods")
const departMethods = require("./lib/departmentMethods")

const databaseMethods = {
    employee: employeeMethods,
    role: roleMethods,
    department: departMethods
}

// look into raw list, expand, separator for inquirer
// https://www.npmjs.com/package/inquirer
function promptUser(){
    const add = "Add departments, roles, employees";
    const view = "View departments, roles, employees";
    const update = "Update employees";
    
    const initialQuestions = [
        {
            type: "list",
            name: "option",
            message: "What would you like to do?",
            choices: [add, view, update]
        },
        {
            type:"list",
            name: "table",
            message: "Which table/attribute would you like to Add/View/Update?",
            choices: function(answer){
                console.log(answer);
                switch (answer.option){
                    case add: 
                        return ['employees', 'roles', 'departments'];
                    case view:
                        return ['employees', 'roles', 'departments'];
                    case update:
                        return ['roles'];
                }
            }
        },
    ]
    inquirer
        .prompt(
            /* Pass your questions in here */
            initialQuestions
        )
        .then(answers => {
            switch(answers.option){
                case add: 
                    console.log(`You choose to add to the ${answers.table} table`);
                    break
                case view:
                    console.log(`You choose to view to the ${answers.table} table`);;
                    break
                case update:
                    console.log(`You choose to update an employee ${answers.table}`);;
                    break
            }
        });
}
promptUser();

// console.log(databaseMethods)

// Create connection with server
const connection = mysql.createConnection({
    host: "localhost",
    
    // Your port; if not 3306
    port: 3306,
    
    // Your username
    user: "root",
    
    // Your password
    password: "root",
    database: "employee_tracker_db"
});

// Connect to server
function connectToServer(){
    connection.connect(function(err) {
        if (err) throw err;
        console.log("connected as id " + connection.threadId);
        // emplMeth.updateData(connection, "manager_id", 3, "first_name", "Jake")
        // emplMeth.addData(connection, "Jimmy", "O'Shoe", 1, 2);
    });
}
// connectToServer();

// Update data in tables
function updateData(employeeId, newRole){
    // http://www.mysqltutorial.org/mysql-nodejs/update/
    // update statment
    let sql = `UPDATE employees
    SET role_id = "${newRole}"
    WHERE employee_id = ${employeeId}`;

    // execute the UPDATE statement
    connection.query(sql, (error, results, fields) => {
    if (error){
    return console.error(error.message);
    }
    console.log('Rows affected:', results.affectedRows);
    });

connection.end();
}

// Add data to tables
function addData(first_name, last_name, role_id, manager_id){
    // http://www.mysqltutorial.org/mysql-nodejs/insert/
    // insert statment
    let sql = `INSERT INTO employees (first_name, last_name, role_id, manager_id)
    VALUES("${first_name}", "${last_name}", "${role_id}", "${manager_id}")`;

    // execute the insert statment
    connection.query(sql);

    connection.end();
}

// Display data from the database to the console in a table format
function displayData(data){

    const tableToDisplay = cTable.getTable(data);

    console.log(tableToDisplay);
}

// Get data from tables
function getData(table) {
    connection.query(`SELECT * FROM ${table}`, function(err, res) {
        if (err) throw err;
        //   console.log(res);
        connection.end();
        displayData(res)
    });
}

