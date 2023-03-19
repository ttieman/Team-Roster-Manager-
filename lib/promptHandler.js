const inquirer = require('inquirer');
const {db} = require('../db/connection');
const { viewEmployees, viewEmployeesByManager, addEmployee, addEmployeePrompt} = require('./employee');
const { viewDepartments , addDepartment,addDepartmentPrompt,deleteDepartment,deleteDepartmentPrompt} = require('./deparment');
const { viewRoles, addRole, addRolePrompt } = require('./role');
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
    answers.selection ==='Add Employee' ? addOperation(addEmployeePrompt,addEmployee) : null;
    answers.selection ==='Add Department' ? addOperation(addDepartmentPrompt,addDepartment) : null;
    answers.selection ==='Add Role' ? addOperation(addRolePrompt,addRole) : null;
    answers.selection ==='Delete Department' ? deleteOperation(deleteDepartmentPrompt,deleteDepartment) : null;
    answers.selection ==='Exit' ? true : null;
      
   })
}

function printTableWithoutIndex(data, chalk) {
    
    data.length === 0 ? console.log('No data found.') : false; // if there is no data console log it and return out
      
    const headers = Object.keys(data[0]);  // grabs the headers for the keys on the first row of data 
    const columnWidths = headers.map((header) => header.length);  // finds the max width of each column
  
// goes over each row and updates them with the columns max width for each item
    data.forEach((row) => {
      headers.forEach((header, index) => {
        columnWidths[index] = Math.max(columnWidths[index], String(row[header]).length);
      });
    });

  // takes in the row and color functions and returns formated strings for each cell with the desired formatting
    const formatRow = (row, colorFns) =>
      row.map((value, index) => colorFns[index](String(value).padEnd(columnWidths[index]))).join(' | ');
  
      //builds white divider lines
    const divider = chalk.white(columnWidths.map((width) => '-'.repeat(width)).join('-|-'));
  
    //logs table headers in white
    console.log(formatRow(headers, headers.map(() => chalk.white)));

    //logs the divider below the headers
    console.log(divider);
  
    //loops over each row to log with correct color sceme
    data.forEach((row) => {
        // Create an array of color functions for each column green for the ID column magenta for the rest
      const colors = [chalk.green, ...headers.slice(1).map(() => chalk.magenta)];

      console.log(formatRow(Object.values(row), colors)); //prints colored formatted row
    });
  //logs a divider at the bottom of the table 
    console.log(divider);
  }
  
  

  const viewOperation = async (viewSQL) => {  // operation to retrive tables from database
    const chalk = await import('chalk'); //dynamic import function for chalk
    db.query(viewSQL, (err, result) => { //queryies the data base
        const terminalWidth = process.stdout.columns; //creates lines to seperate table from menu 
        const line = '-'.repeat(terminalWidth);
        console.log(line);
      printTableWithoutIndex(result, chalk.default); //prints the table without the index column
  
      setTimeout(() => {     // sets a time out delay allowing the table to take up its own space and not be covered 
        console.log(line);   // by the selection menu to allow all the info to be displayed before the menu is displayed
        startMenu();
      }, 500);
    });
  };

  const addOperation = (questions, addSQL) => { // this is an add operation that will take in questions and sql lines that
                                                // that will then be used with mysql2
    return inquirer.prompt(questions)
    .then(addSQL)
    .then(() => startMenu());
  };

  const deleteOperation = (questions, deleteSQL) => {
    return inquirer.prompt(questions)
      .then((response) => deleteSQL({ deleteDep: response.delete_department }))
      .then(() => startMenu());
  }
  
module.exports = startMenu;