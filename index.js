
const inquirer = require('inquirer'); //import inquirer

const startMenu = require('./lib/promptHandler'); //import promptHandler

async function viewMenuOptions() { //view menu options is the main function that invokes the application
  await startMenu();
}

viewMenuOptions(); //start the application