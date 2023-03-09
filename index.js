const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");


// TODO: Write Code to gather information about the development team members, and render the HTML file.

const employees = [];  // an empty array  to hold employees 

function addIntern() {
    return inquirer.prompt([
         {
            type: "input",
            name: "internName",
            message: "what is your Intern's Name"
        }, 
        {
            type: "input",
            name: "internId",
            message: "what is your Interns's ID"
            
        }, 
        {
            type: "input",
            name: "internEmail",
            message: "what is your intern's Email"
        }, 
        {
            type: "input",
            name: "internSchool",
            message: "what is your Intern's School?"
        }
    

    ]).then(answers => {
        const intern = new Intern (answers.internName,answers.internId, answers.internEmail,answers.internSchool)
        employees.push(intern)
        console.log(intern)
        creatTeam()
    })
}

function addEngineer () {
    return inquirer.prompt([
        {
            type: "input",
            name: "engineerName",
            message: "what is your Engineer's Name"
        }, 
        {
            type: "input",
            name: "engineerId",
            message: "what is your Engineer's ID"
            
        }, 
        {
            type: "input",
            name: "engineerEmail",
            message: "what is your Engineer's Email"
        }, 
        {
            type: "input",
            name: "engineerGithub",
            message: "what is your Engineer's Github"
        }
    

    ]).then(answers => {
        const engineer = new Engineer (answers.engineerName,answers.engineerId, answers.engineerEmail,answers.engineerGithub)
        employees.push(engineer)
        console.log(engineer)
        creatTeam()
    })
}

function promptManager() {
  return inquirer.prompt([
    {
      type: "input",
      name: "managerName",
      message: "Enter the team manager's name:",
    },
    {
      type: "input",
      name: "managerId",
      message: "Enter the team manager's employee ID:",
    },
    {
      type: "input",
      name: "managerEmail",
      message: "Enter the team manager's email address:",
    },
    {
      type: "input",
      name: "managerofficeNumber",
      message: "Enter the team manager's office number:",
    },
  ]).then(answers => {
    const manager = new Manager(answers.managerName, answers.managerId, answers.managerEmail, answers.managerofficeNumber)
    employees.push(manager)
    console.log(manager)
    creatTeam()
  });

}

promptManager()

function creatTeam () {
    return inquirer.prompt([
        {
            type: "list",
            name: "memberRole",
            message: "What is your role?",
            choices: [
                "Engineer",
               "Intern",
               "Not applicable"
            ]
        }
    ]).then(userRole => {
        if(userRole.memberRole === "Engineer"){
            addEngineer()

        }else if (userRole.memberRole === "Intern"){
            addIntern()

        }else {
            buildTeam()

        }
    })

}