
const inquirer = require('inquirer'); //import inquirer

const startMenu = require('./lib/promptHandler');

async function viewMenuOptions() {
  await startMenu();
}

viewMenuOptions();