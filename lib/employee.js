const inquirer = require('inquirer'); //import inquirer

const availableRoles = ['Accountant','Accounting Manager','Sales Representative','Sales Manager','Lawyer','Legal Team Manager','Sofware Engineer','Engineering Team Manager'];


const viewEmployees = `SELECT 
employed.id AS ID, 
employed.first_name AS First_Name, 
employed.last_name AS Last_Name, 
roles.roles_title AS Role,
department.department_name AS Department, 
roles.roles_salary AS Salary, 
managed.first_name AS Manager
FROM employee employed
INNER JOIN roles ON employed.role_id = roles.id
INNER JOIN department ON roles.department_id = department.id
LEFT JOIN employee managed ON employed.manager_id = managed.id;`;

const viewEmployeesByManager = `SELECT 
employed.id AS ID, 
employed.first_name AS First_Name, 
employed.last_name AS Last_Name, 
roles.roles_title AS Role,
department.department_name AS Department, 
CONCAT_WS(' ', managed.first_name, managed.last_name) AS Manager
FROM employee employed
INNER JOIN roles ON employed.role_id = roles.id
INNER JOIN department ON roles.department_id = department.id
LEFT JOIN employee managed ON employed.manager_id = managed.id
ORDER BY Manager;`;


//array of prompts for add employee functionality
const addEmployeePrompt = [
    {
    name:"first_name",
    type:'input',
    message:'What is their first name?',
    validate: (input) => {
        var isNameFormat = /^[A-Za-z]{1,30}$/.test(input);
       !isNameFormat ?  console.log(" Please enter a name.")
       : true;
       return isNameFormat;
         }
    },
    {
        name:"last_name",
        type:'input',
        message:'What is their last name?',
        validate: (input) => {
            var isNameFormat = /^[A-Za-z]{1,30}$/.test(input);
           !isNameFormat ?  console.log(" Please enter a name.")
           : true;
           return isNameFormat;
             }
    },
    {
        name:"role",
        type:'list',
        message:"What is this employee's role",
        choices:availableRoles
    },
    {
        type: 'confirm',
        name: 'has_manager',
        message: 'Does this employee have a manager?',
        default: true
    },
    {
        type: 'list',
        name: 'manager',
        message: "Who is the employee's manager?",
        choices: ['Jon Donkowski', 'Mike Chan', 'Ashley Rodriguez', 'Kevin Tupik', 'Malia Brown', 'Sarah Lourd', 'Tom Allen', 'Jackie Meyer', 'Tyson Mack', 'Rebecca Flounder'],
        when: (input) => input.has_manager ? true : false   
    },
    {
        name:"confirm",
        type:'input',
        message:'Does all the inforamtion look correct?',
        default: true,
    },
        
    ];

 addEmployee = () => {
   return  inquirer.prompt(addEmployeePrompt);
}



module.exports = { addEmployee,
                   viewEmployees,
                   viewEmployeesByManager};