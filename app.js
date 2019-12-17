// import node modules
const inquirer = require("inquirer");
const mysql = require("mysql");
const cTable = require("console.table");

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
        addData("John", "Smith", "1", "2")
    });
}
connectToServer();

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
// look into raw list, expand, separator for inquirer
// --------------
// ---------------
// -----------------

function getData(table) {
    connection.query(`SELECT * FROM ${table}`, function(err, res) {
      if (err) throw err;
    //   console.log(res);
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
