const inquirer = require('inquirer'); //import inquirer
const db = require('../db/connection');


const viewDepartments = `SELECT * FROM department;`;

const addDepartmentPrompt = [{
    
        name: 'department_name',
        type: 'input',
        message:'What department would you like to add?',
        validate: (input) => {
            var isNameFormat = /^[A-Za-z]{1,30}$/.test(input);
           !isNameFormat ?  console.log(" Please enter a department.")
           : true;
           return isNameFormat;
             }
           }];


const addDepartment = (({department_name}) => {
    const SQL = `INSERT INTO department (department_name) VALUES (?)`;
    const param = department_name;
    db.query(SQL, param, (err, res) => {});
});


module.exports = {viewDepartments,
                  addDepartmentPrompt,
                  addDepartment  
};