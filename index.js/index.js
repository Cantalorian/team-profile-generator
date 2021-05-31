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
      message: "Welcome to the Team Generator. Please write your team name:",
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

function compileTeam() {
  console.log("//////////You've done it!!! Here is your team.////////")

  const htmlArray = []
  const htmlBeginning = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>${teamArr[0]}</title>
  <link href="https://fonts.googleapis.com/css?family=Bebas+Neue&display=swap" rel="stylesheet">
  <style>
    ${style}
  </style>
</head>
<body>
  <div class="banner-bar">
      <h1>${teamArr[0]}</h1>
  </div>
  <div class="card-container">
  `
  htmlArray.push(htmlBeginning);

  for (let i = 1; i < teamArr.length; i++) {
      let object = `
      <div class="member-card">
          <div class="card-top">
              <h2>${teamArr[i].name}</h2>
              <h2>${teamArr[i].title}</h2>
          </div>
          <div class="card-bottom">
              <p>Employee ID: ${teamArr[i].id}</p>
              <p>Email: <a href="mailto:${teamArr[i].email}">${teamArr[i].email}</a>></p>
      `
      if (teamArr[i].officeNumber) {
          object += `
          <p>${teamArr[i].officeNumber}</p>
          `
      }
      if (teamArr[i].github) {
          object += `
          <p>GitHub: <a href="https://github.com/${teamArr[i].github}">${teamArr[i].github}</a></p>
          `
      }
      if (teamArr[i].school) {
          object += `
          <p>School: ${teamArr[i].school}</p>
          `
      }
      object += `
      </div>
      </div>
      `
      htmlArray.push(object)
  };

  const htmlEnd = `
  </div>
  </body>
  </html>
  `
  htmlArray.push(htmlEnd);

  fs.writeFile(`${teamArr[0]}.html`, htmlArray.join(""), function (err) {

  })
}

startingPrompt();