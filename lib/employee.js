const inquirer = require('inquirer'); //import inquirer
const {dbP} = require('../db/connection');

const idExistsInEMployee = async (id) => {
    const connection = await dbP;
    const [rows] = await connection.query(`Select * FROM roles WHERE id = ?`, [id]);
    return rows.length > 0;
}

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
        name: 'employee_id',
        type: 'input',
        message: 'Enter a new employee ID this cant match the id of any other role.',
        validate: async (input) => {
            const isNumber = /^[0-9]+$/.test(input);
             const exists = await idExistsInEMployee(input);
             return !isNumber
             ? (console.log(' Please enter a valid number.'), false)
             : (await idExistsInEMployee(input))
             ? (console.log(' This employee ID already exists. Please enter a new ID'), false)
             : true;
        }
    },
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
        choices: async () => {
            const connection = await dbP;
            const [rows] = await connection.query(`SELECT roles_title FROM roles;`);
            return rows.map(row => row.roles_title);
        }
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
        choices: async () => {
            const connection = await dbP;
            const [rows] = await connection.query(`SELECT employee.id, employee.first_name, employee.last_name, department.department_name
            FROM employee 
            INNER JOIN roles AS role ON employee.role_id = role.id
            INNER JOIN department AS department ON role.department_id = department.id
            WHERE employee.manager_id IS NULL;`);

            return rows.map(row => ({
                name: `${row.first_name} ${row.last_name} (${row.department_name})`,
                value: `${row.first_name} ${row.last_name}`,
              }));
          },
        when: (input) => input.has_manager ? true : false   
    }
    ];

    const addEmployee = async ({ employee_id, first_name, last_name, role, manager }) => {
        const connection = await dbP;
        const [roleRows] = await connection.query(`SELECT id FROM roles WHERE roles_title = ?`, [role]);
        const role_id = roleRows[0].id;
      
        let manager_id = null;
        if (manager) {
          const [managerRows] = await connection.query(
            `SELECT id FROM employee WHERE CONCAT(first_name, ' ', last_name) = ?`, [manager]
          );
          manager_id = managerRows[0].id;
        }
      
        const SQL = `INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
                     VALUES (?, ?, ?, ?, ?);`;
        const params = [employee_id, first_name, last_name, role_id, manager_id];
        await connection.query(SQL, params);
      };

      const deleteEmployeePrompt =[
        {
            type: 'list',
            name: 'delete_employee',
            message: "Which employee do you want to delete?",
            choices: async () => {
                const connection = await dbP;
                const [rows] = await connection.query(`SELECT employee.id, employee.first_name, employee.last_name, department.department_name
                FROM employee 
                INNER JOIN roles AS role ON employee.role_id = role.id
                INNER JOIN department AS department ON role.department_id = department.id;`);
    
                return rows.map(row => ({
                    name: `${row.first_name} ${row.last_name} (${row.department_name})`,
                    value: `${row.id}`,
                  }));
            }
        }
    ];
    
    const deleteEmployee = async (response) => {
        const connection = await dbP;
        const SQL = `DELETE FROM employee WHERE id =?;`;
        const params = [response.delete_employee];
        await connection.query(SQL, params);
        
    } 
    



module.exports = { addEmployee,
                   viewEmployees,
                   viewEmployeesByManager,
                   addEmployeePrompt,
                   deleteEmployee,
                   deleteEmployeePrompt,
                  };