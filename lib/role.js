const inquirer = require('inquirer'); //import inquirer
const {dbP} = require('../db/connection');
const { addDepartment } = require('./deparment');



const idExistsInRoles = async (id) => {
    const connection = await dbP;
    const [rows] = await connection.query('SELECT * FROM roles WHERE id = ?', [id]);
    return rows.length > 0;
}
const idExistsInDepartment = async (id) => {
    const connection = await dbP;
    const [rows] = await connection.query('SELECT * FROM department WHERE id = ?', [id]);
    return rows.length > 0;
  };

const viewRoles = `SELECT roles.id AS ID, 
                   roles_title AS Role,
                   roles_salary AS Salary,
                   department_name AS Department 
                   FROM roles INNER JOIN department 
                   ON roles.department_id = department.id;`;


const addRolePrompt = [
    {
        name: 'role_id',
        type: 'input',
        message: 'Enter a new role id this cant match the id of any other role.',
        validate: async (input) => {
            const isNumber = /^[0-9]+$/.test(input);
            const exists = await idExistsInRoles(input);
         return !isNumber
         ? (consol.log(` Please enter a valid number.`),false)
         : (await idExistsInRoles(input))
         ? (console.log(` This employee ID already exists. Please enter a new ID`), false)
         : true;
        }
    },
    {
        name: 'role_title',
        type: 'input',
        message: 'What is the title of the role you would like to add?',
        validate: (input) => {
            var isNameFormat = /^[A-Za-z ]{1,30}$/.test(input);
            !isNameFormat ?  console.log(" Please enter a department.")
            : true;
            return isNameFormat;
        }
    },
    {
        name:'role_salary',
        type:'input',
        message: 'What is the this roles salary',
        validate: (input) => {
            return input === isNaN ? console.log(' Please enter a salary') : true }
    },
    {
        name: 'department_id',
        type: 'input',
        message: ' Please enter the department id number this role belongs to.',
        validate: async (input) => { 
            const exists = await idExistsInDepartment(input);
            return !exists ? console.log(" That number doesnt match any stored department ID'S") : true }
        

    }];

    const addRole = async ({role_id, role_title, role_salary, department_id}) => {
        const connection = await dbP;
        const SQL = `INSERT INTO roles (id, roles_title, roles_salary, department_id)
                     VALUES (?, ?, ?, ?);`;
                     const params = [role_id,role_title,role_salary,department_id];
                     connection.query(SQL, params);
    };

    const deleteRolePrompt =[
        {
            type:'list',
            name:'delete_role',
            message:'What role do you want to delete?',
            choices: async () => {
                const connection = await dbP;
                const [rows] = await connection.query(`SELECT roles_title FROM roles`);
                return rows.map(row => row.roles_title);
            }
        }
    ];
    
    const deleteRole = async (response) => {
        const connection = await dbP;
        const SQL = `DELETE FROM roles WHERE roles_title =?;`;
        const params = [response.delete_role];
        await connection.query(SQL, params);
        
    } 

   const viewTotalSpendingBudget = `
   (
    SELECT department.department_name, SUM(roles.roles_salary) AS \`Total Spending on Salary\`
    FROM employee
    JOIN roles ON employee.role_id = roles.id
    JOIN department ON roles.department_id = department.id
    GROUP BY department.department_name
)
UNION ALL
(
    SELECT 'Total', SUM(roles.roles_salary)
    FROM employee
    JOIN roles ON employee.role_id = roles.id
);`

module.exports = {viewRoles,
                  addRolePrompt,
                  addRole,
                  deleteRole,
                deleteRolePrompt,
                viewTotalSpendingBudget};