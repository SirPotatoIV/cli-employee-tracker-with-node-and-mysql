-- Deletes database if it already exists
DROP DATABASE IF EXISTS employee_tracker_db;

-- Creates database called employee_tracker_db.
CREATE DATABASE employee_tracker_db;

-- Tells mySQL to use employee_tracker_db for the following code.
USE employee_tracker_db;

-- Creates table used for storing employees
CREATE TABLE employees (
  id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30) NULL,
  last_name VARCHAR(30) NULL,
  role_id INT NULL,
  manager_id INT NULL,
  PRIMARY KEY (id)
);

-- Creates table used for storing roles
CREATE TABLE roles (
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(30) NULL,
  last_name VARCHAR(30) NULL,
  role_id INT NULL,
  manager_id INT NULL,
  PRIMARY KEY (id)
);

-- Creates table used for storing departments
CREATE TABLE departments (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(30) NULL,
  PRIMARY KEY (id)
);

-- Using these as temp test values
INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Jake", "O'Toole", 1, 1), ("Kristen", "O'Toole", 2, 2), ("Penny", "O'Toole", 3, 2);