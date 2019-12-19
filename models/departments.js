// Dependencies
// =============================================================

// This may be confusing but here Sequelize (capital) references the standard library
const Sequelize = require("sequelize");
// sequelize (lowercase) references our connection to the DB.
const sequelize = require("../config/connection.js");

// Creates an "Employees" model that matches up with DB
const Departments = sequelize.define("departments", {
        departments_id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
        title: { type:Sequelize.STRING,  allowNull: false },
    },
    {
        // options
        timestamps: false
    }
);

// Syncs with DB
Departments.sync();

// Makes the Departments Model available for other files (will also create a table)
module.exports = Departments;
