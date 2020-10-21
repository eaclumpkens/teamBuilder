// CLASSES
const Manager = require("./lib/Manager");
const Intern = require("./lib/Intern");
const Engineer = require("./lib/Engineer");

// NODE DEPENDENCIES
const inquirer = require("inquirer");
const fs = require("fs");

// TEAM BUILDING
const teamMembers = [];
const idArray = [];

// FUNCTIONS

function startApp() {

    // MANAGER CREATION
    function createManager(){
        console.log("Begin building team.");
        inquirer.prompt([
            {
                type: "input",
                message: "What is your manager's name?",
                name: "managerName"
            },
            {
                type: "input",
                message: "What is your manager's ID?",
                name: "managerID"
            },
            {
                type: "input",
                message: "What is your manager's email?",
                name:"managerEmail"
            },
            {
                type: "input",
                message: "What is your manager's office number?",
                name:"managerOffice"
            }
        ]).then(answers => {
            const manager = new Manager(answers.managerName, answers.managerID, answers.managerEmail, answers.managerOffice);
            teamMembers.push(manager);
            idArray.push(answers.managerID);
            createTeam();
        });
    };

    // TEAM CREATION 
    function createTeam() {
        // TEAM MEMBER TYPE
        inquirer.prompt([
            {
                type: "list",
                name: "memberChoice",
                message: "Which type of team member are you adding?",
                choices: [
                    "Intern",
                    "Engineer",
                    "No additional members"
                ]
            }
        ]).then(choice => {
            switch(choice.memberChoice) {
                case "Intern":
                    addIntern();
                    break;
                case "Engineer":
                    addEngineer();
                    break;
                default:
                    buildTeam();        
            }
        });
    }

    // ADD INTERN
    function addIntern() {
        inquirer.prompt([
            {
                type: "input",
                message: "What is your intern's name?",
                name: "internName"
            },
            {
                type: "input",
                message: "What is your intern's ID?",
                name: "internID"
            },
            {
                type: "input",
                message: "What is your intern's email?",
                name: "internEmail"
            },
            {
                type: "input",
                message: "What is your intern's school?",
                name: "internSchool"
            }
        ]).then(answers => {
            const intern = new Intern(answers.internName, answers.internID, answers.internEmail, answers.internSchool);
            teamMembers.push(intern);
            idArray.push(answers.internID);
            
            // CREATE ADDITIONAL TEAM MEMBER
            createTeam();
        });
        
    }

    // ADD ENGINEER
    function addEngineer() {
        inquirer.prompt([
            {
                type: "input",
                message: "What is your engineer's name?",
                name: "engineerName"
            },
            {
                type: "input",
                message: "What is your engineer's ID?",
                name: "engineerID"
            },
            {
                type: "input",
                message: "What is your engineer's email?",
                name: "engineerEmail"
            },
            {
                type: "input",
                message: "What is your engineer's GitHub username?",
                name: "engineerGithub"
            }
        ]).then(answers => {
            const engineer = new Engineer(answers.engineerName, answers.engineerID, answers.engineerEmail, answers.engineerGithub);
            teamMembers.push(engineer);
            idArray.push(answers.engineerID);

            // CREATE ADDITIONAL TEAM MEMBER
            createTeam();
        });
    }

    // BUILD TEAM
    function buildTeam() {
       
        console.log(teamMembers, idArray);

    }

    createManager();
    
}

startApp();