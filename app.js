// import node modules
const inquirer = require("inquirer");
const mysql = require("mysql");
const cTable = require("console.table");
const dbMethods = require("lib/databaseMethods.js")

const employeeMethods = new dbMethods("employees");

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


function connectToServer(){
    connection.connect(function(err) {
        if (err) throw err;
        console.log("connected as id " + connection.threadId);
        // promptUser();
        
    });
}
connectToServer();

// Used to update data in tables
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

// Used to add data to tables
function addData(first_name, last_name, role_id, manager_id){
    // http://www.mysqltutorial.org/mysql-nodejs/insert/
    // insert statment
    let sql = `INSERT INTO employees (first_name, last_name, role_id, manager_id)
    VALUES("${first_name}", "${last_name}", "${role_id}", "${manager_id}")`;

    // execute the insert statment
    connection.query(sql);

    connection.end();
}

// Used to display data from the database to the console in a table format
function displayData(data){

    const tableToDisplay = cTable.getTable(data);

    console.log(tableToDisplay);
}

// Used to get data from tables
function getData(table) {
    connection.query(`SELECT * FROM ${table}`, function(err, res) {
        if (err) throw err;
        //   console.log(res);
        connection.end();
        displayData(res)
    });
}

// look into raw list, expand, separator for inquirer
function promptUser(){
    const initialQuestions = [
        {
            type: "list",
            name: "action",
            message: "What would you like to do?",
            choices: ["View All Employees", "View All Employees By Department", "View All Employees by Manager", "Add Employee", "Remove Employee", "Update Employee Role", "Update Employee Manger"]
        }
    ]
    inquirer
        .prompt(
            /* Pass your questions in here */
            initialQuestions
        )
        .then(answers => {
            console.log(answers);
        });
}
