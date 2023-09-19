const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Chickenfingers',
    database: 'employee_db' 
});

const inquirer = require('inquirer');
const mysql = require('mysql2');
const Database = require('db-queries');
const queryDB = new Database();


db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database: ' + err.stack);
    return;
    }
    console.log('Connected to the database as ID ' + db.threadId);
});


queryDB.getAllDepartments()

    .then((departments) => {
    console.log(departments);
    })

    .catch((error) => {
    console.error(error);
    });


function mainMenu() {
    inquirer
        .prompt([
        {
            type: 'list',
            name: 'menuChoice',
            message: 'Select an option:',
            choices: [
                'View all departments',
                'View all roles',
                'View all employees',
                'Add a department',
                'Add a role',
                'Add an employee',
                'Update an employee role',
                'Exit'
            ]
        }
        ])
        
        .then((answers) => {
            
            // handle user's choice
            switch (answers.menuChoice) {
                case 'View all departments':
                // function to view all departments
                break;

                case 'View all roles':
                // function to view all roles
                break;
                
                case 'View all employees':
                // function to view all employees
                break;
                
                case 'Add a department':
                // function to add a department
                break;
                
                case 'Add a role':
                // function to add a role
                break;
                
                case 'Add an employee':
                // function to add an employee
                break;
                
                case 'Update an employee role':
                // function to update an employee's role
                break;
                
                case 'Exit':
                    // Close the database connection
                console.log('Goodbye!');
                db.end(); 
                return;
            }

            // call mainMenu() again after each action to display the menu again
            mainMenu();
            })
            
            .catch((error) => {
            console.error(error);
            });
            }

    mainMenu();

