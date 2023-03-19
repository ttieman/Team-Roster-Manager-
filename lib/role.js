const inquirer = require('inquirer'); //import inquirer

const viewRoles = `SELECT roles.id AS ID, 
                   roles_title AS Role,
                   roles_salary AS Salary,
                   department_name AS Department 
                   FROM roles INNER JOIN department 
                   ON roles.department_id = department.id;`;

module.exports = {viewRoles};