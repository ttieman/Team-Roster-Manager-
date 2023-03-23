const inquirer = require('inquirer'); //import inquirer
const {db, dbP} = require('../db/connection'); //import sql connection

const departmentExists = async (departmentName) => {  //check if department exists
    const connection = await dbP; ///await for connection
    const [rows] = await connection.query(`SELECT * FROM department WHERE department_name = ?`, [departmentName]); //await for query
    return rows.length > 0; //return true if department exists
  }

const viewDepartments = `SELECT * FROM department;`;  //view departments

const addDepartmentPrompt = [ //add department prompt
    {
        name: 'department_name',
        type: 'input',
        message:'What department would you like to add?',
        validate: async (input) => {
            const exists = await departmentExists(input);
            const isNameFormat = /^[A-Za-z \s]{1,30}$/.test(input);
            return !isNameFormat ? "Please enter a department name." : (exists ? "This department already exists. Please enter a new department name." : true);
          }
    }];


const addDepartment = (({department_name}) => { //add department
    const SQL = `INSERT INTO department (department_name) VALUES (?)`; //sql query
    const param = department_name;
    db.query(SQL, param, (err, res) => {}); //query
});

const deleteDepartmentPrompt =[  //delete department prompt
    {
        type:'list',
        name:'delete_department',
        message:'What department do you want to delete?',
        choices: async () => {
            const connection = await dbP;
            const [rows] = await connection.query(`SELECT department_name FROM department`);
            return rows.map(row => row.department_name);
        }
    }
];

const deleteDepartment = async (response) => { //delete department
    const connection = await dbP;
    const SQL = `DELETE FROM department WHERE department_name =?;`;
    const params = [response.delete_department];
    await connection.query(SQL, params);
    
} 


module.exports = {viewDepartments,
                  addDepartmentPrompt,
                  addDepartment,
                  deleteDepartmentPrompt,
                  deleteDepartment,
                };