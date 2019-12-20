// Dependencies
// =============================================================

// This may be confusing but here Sequelize (capital) references the standard library
const Sequelize = require("sequelize");
// sequelize (lowercase) references our connection to the DB.
const sequelize = require("../config/connection.js");

// Creates an "Employees" model that matches up with DB
const Roles = sequelize.define("roles", {
    id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
    title: { type:Sequelize.STRING,  allowNull: false },
    salary: { type:Sequelize.INTEGER,  allowNull: false },
    department_id: { type:Sequelize.INTEGER,  allowNull: false },
},{
    // options
    timestamps: false
});

// Syncs with DB
Roles.sync();

// Makes the Roles Model available for other files (will also create a table)
module.exports = Roles;
