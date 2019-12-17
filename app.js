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
        afterConnection();
      });

      function afterConnection() {
        connection.query("SELECT * FROM employees", function(err, res) {
          if (err) throw err;
          console.log(res);
          connection.end();
        });
      }
}
contactServer();

// Used to display information to the console in a table format
function displayInfo(){
    const testArray = [
        {name: 'foo',
        type: 'test'
    }, 
        {name: 'bar',
        type: 'test'
    },
        {name: 'jake',
        type: 'test'
    }
    ]

    const tableToDisplay = cTable.getTable(testArray);

    console.log(tableToDisplay);
}

// function promptUser(){
//     inquirer
//         .prompt([
//             /* Pass your questions in here */
//         ])
//         .then(answers => {
//             // Use user feedback for... whatever!!
//         });
// }
