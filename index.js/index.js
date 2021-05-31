const inquirer = require('inquirer');
const fs = require('fs');
const style = require('../dist/css');

const Employee = require('../lib/Employee');
const Engineer = require('../lib/Engineer');
const Intern = require('../lib/Intern');
const Manager = require('../lib/Manager');

let teamArr = [];

function startingPrompt() {
  inquirer.prompt([
    {
      message: "Wlecome to the Team Generator. Please write your team name:",
      name: "teamname"
    }
  ])
  .then(function (data) {
    const teamName = data.teamname
    teamArr.push(teamName)
    addManager()
  })
};

function addManager() {
  inquirer.prompt([
    {
      message: "What is your team manager's name?",
      name: "name"
    },
    {
      message: "What is your team manger's email address?",
      name: "email"
    },
    {
      type: "number",
      message: "What is your team manager's office number?",
      name: "officeNumber"
    },
  ])
  .then(function (data) {
    const name = data.name;
    const id = teamArr.length;
    const email = data.email;
    const officeNumber = data.officeNumber;
    const teamMember = new Manager(name, id, email, officeNumber);
    teamArr.push(teamMember);
    addTeamMembers();
  });
};

function addTeamMembers() {
  inquirer.prompt([
    {
      type: "list",
      message: "Would you like to add more team members?",
      choices: ["Yes, add an engineer", "Yes, add an intern", "No, my team is complete"],
      name: "addMemberData"
    }
  ])
  .then(function (data) {
    switch (data.addMemberData) {
      case "Yes, add an engineer":
        addEngineer();
        break;
      case "Yes, add an intern":
        addIntern();
        break;
      case "No, my team is complete":
        compileTeam();
        break;
      }
  });
};

function addEngineer() {
  inquirer.prompt([
    {
      message: "What is this engineer's name?",
      name: "name"
    },
    {
      message: "What is this engineer's email address?",
      name: "email"
    },
    {
      message: "What is this engineer's Github profile?",
      name: "github"
    }
  ])
  .then(function (data) {
    const name = data.name;
    const id = teamArr.name;
    const email = data.email;
    const github = data.github;
    const teamMember = new Engineer(name, id, email, github);
    teamArr.push(teamMember);
    addTeamMembers();
  });
};

function addIntern() {
  inquirer.prompt([
    {
      message: "What is this intern's name?",
      name: "name"
    },
    {
      message: "What is this intern's email address?",
      name: "email"
    },
    {
      message: "What is this intern's school?",
      name: "school"
    }
  ])
  .then(function (data) {
    const name = data.name
    const id = teamArr.length +1 
    const email = data.email
    const school = data.school
    const teamMember = new Intern(name, id, email, school)
    teamArr.push(teamMember)
    addTeamMembers()
  });
};