const inquirer = require('inquirer');
const db = require('../db/connection');
const { viewEmployees, viewEmployeesByManager } = require('./employee');
const { viewDepartments } = require('./deparment');
const { viewRoles } = require('./role');
 //declaring an array of cli menu options
 const menuOptions = [
    'Add Department',
    'Add Role',
    'Add Employee',
    'View Departments',
    'View Roles',
    'View Employees',
    'View Employees by Manager',
    'View Salary Budget',
    'Update Roles',
    'Update Employees Manager',
    'Delete Department',
    'Delete Role',
    'Delete Employee',
    'Exit'
]; 

const startMenuPrompt = [ {
    name:'selection',
    type:'list',
    message:'Select from the list of options.',
    choices:menuOptions,
},
];

startMenu = () => {     //this function handles serving the inital options when the appliction starts
   return  inquirer.prompt( startMenuPrompt
   ).then((answers) => {
     answers.selection ==='View Employees by Manager' ? viewOperation(viewEmployeesByManager) : null;
     answers.selection ==='View Roles' ? viewOperation(viewRoles) : null;
     answers.selection ==='View Departments' ? viewOperation(viewDepartments) : null;
     answers.selection ==='View Employees' ? viewOperation(viewEmployees) : null;
     answers.selection ==='Exit' ? true : null;
      
   })
}

function printTableWithoutIndex(data, chalk) {
    if (data.length === 0) {
      console.log('No data found.');
      return;
    }
  
    const headers = Object.keys(data[0]);
    const columnWidths = headers.map((header) => header.length);
  
    data.forEach((row) => {
      headers.forEach((header, index) => {
        columnWidths[index] = Math.max(columnWidths[index], String(row[header]).length);
      });
    });
  
    const formatRow = (row, colorFns) =>
      row.map((value, index) => colorFns[index](String(value).padEnd(columnWidths[index]))).join(' | ');
  
    const divider = chalk.white(columnWidths.map((width) => '-'.repeat(width)).join('-|-'));
  
    console.log(formatRow(headers, headers.map(() => chalk.white)));
    console.log(divider);
  
    data.forEach((row) => {
      const colors = [chalk.green, ...headers.slice(1).map(() => chalk.magenta)];
      console.log(formatRow(Object.values(row), colors));
    });
  
    console.log(divider);
  }
  
  

  const viewOperation = async (viewSQL) => {
    const chalk = await import('chalk');
    db.query(viewSQL, (err, result) => {
        const terminalWidth = process.stdout.columns;
        const line = '-'.repeat(terminalWidth);
        console.log(line);
      printTableWithoutIndex(result, chalk.default); // Pass chalk.default to the function
  
      setTimeout(() => {
        console.log(line);
        startMenu();
      }, 500);
    });
  };
  


module.exports = startMenu;