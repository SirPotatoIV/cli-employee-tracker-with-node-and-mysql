// import node modules
const inquirer = require("inquirer");
const mysql = require("mysql");
const cTable = require("console.table");

// Create connection with server
function contactServer(){
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

    connection.connect(function(err) {
        if (err) throw err;
        console.log("connected as id " + connection.threadId);
        promptUser();
      });

}
contactServer();

// Used to display data from the database to the console in a table format
function displayData(data){

    const tableToDisplay = cTable.getTable(data);

    console.log(tableToDisplay);
}
// look into raw list, expand, separator for inquirer
// --------------
// ---------------
// -----------------

function getDBdata() {
    connection.query("SELECT * FROM employees", function(err, res) {
      if (err) throw err;
      console.log(res);
      connection.end();
      displayData(res)
    });
}

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
