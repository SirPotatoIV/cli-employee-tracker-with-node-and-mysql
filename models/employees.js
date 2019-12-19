// Dependencies
// =============================================================

// This may be confusing but here Sequelize (capital) references the standard library
const Sequelize = require("sequelize");
// sequelize (lowercase) references our connection to the DB.
const sequelize = require("../config/connection");

// Creates an "Employees" model that matches up with DB
const Employees = sequelize.define("employees", {
    employee_id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
    first_name: { type:Sequelize.STRING,  allowNull: false },
    last_name: { type:Sequelize.STRING,  allowNull: false },
    role_id: { type:Sequelize.INTEGER,  allowNull: false },
    manager_id: { type:Sequelize.INTEGER,  allowNull: true }
}, 
{
    // options
    timestamps: false
}
);

// Syncs with DB
Employees.sync();

// Makes the Employees Model available for other files (will also create a table)
module.exports = Employees;
