const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const employees = [];

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
const getherInformation = (role) => {
    return inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "Enter the employee name",
            required: true,
        },
        {
            type: "input",
            name: "id",
            message: "Enter your employee id",
            required: true,
        },
        {
            type: "input",
            name: "email",
            message: "Enter the employee's email",
            required: true,
        },
        {
            type: "list",
            name: "role",
            message: "What is your role?",
            choices: ["Manager", "Engineer", "Intern"],
            required: true,
        },

    ])
        .then(answers => {
            //When role is Manager
            if (answers.role === "Manager") {
                return inquirer.prompt([
                    {
                        type: "input",
                        name: "officeNumber",
                        message: "Enter your office number",
                        required: true,
                    },

                ])
                    .then(result => {
                        const manager = new Manager(answers.name, answers.id, answers.email, result.officeNumber);
                        employees.push(manager);
                        return addEmployee ();
                    })
            }

            // When role is Engineer
            if (answers.role === "Engineer") {
                return inquirer.prompt([
                    {
                        type: "input",
                        name: "github",
                        message: "Enter the engineer's github profile",
                        required: true,
                    },

                ])
                    .then(result => {
                        const engineer = new Engineer(answers.name, answers.id, answers.email, result.github);
                        employees.push(engineer);
                        return addEmployee ();
                    })
            }

            // When role is Intern
            if (answers.role === "Intern") {
                return inquirer.prompt([
                    {
                        type: "input",
                        name: "school",
                        message: "Enter the intern's school name",
                        required: true,
                    },

                ])
                    .then(result => {
                        const intern = new Intern(answers.name, answers.id, answers.email, result.school);
                        employees.push(intern);
                        return addEmployee ();
                    })
            }

        });
};

const addEmployee = () => {
    return inquirer.prompt ({
        type: "list",
        name: "add",
        message: "Select another team member to add, or select 'Done'",
        choices: ["Engineer", "Intern", "DONE"],
        required: true,
        default: "Done"
    })
    .then(result => {
        if(result.add === "Engineer"){
            getherInformation();
        }else if (result.add === "Intern"){
            getherInformation();
        }
        else {
            const html = render(employees);
            fs.writeFile(outputPath, html, function (err) {
                if (err) throw err;
                console.log('Saved!');
            });
        }
    })
}
// call to get employee information
getherInformation();

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
