// import node modules
const inquirer = require("inquirer");
const mysql = require("mysql");
const cTable = require("console.table");

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
