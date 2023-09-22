process.stdin.setMaxListeners(20);
const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Chickenfingers',
    database: 'employee_db' 
});

const inquirer = require('inquirer');
const Database = require('./queries');
const queryDB = new Database();


db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database: ' + err.stack);
    return;
    }
    // console.log('Connected to the database as ID ' + db.threadId);
});

function mainMenu() {

    let roleChoices;

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
            
            switch (answers.menuChoice) {
                case 'View all departments':
                    queryDB.getAllDepartments()
                    .then((departments) => {
                        console.table(departments);
                        mainMenu();
                    })
                    .catch((error) => {
                        console.error('Error viewing departments:', error);
                        console.log('An error occurred.  Exiting the application.');
                        db.end();
                        return;
                    });
                break;

                case 'View all roles':
                    queryDB.getAllRoles()
                    .then((roles) => {
                        console.table(roles);
                        mainMenu();
                    })
                    .catch((error) => {
                        console.error('Error viewing roles:', error);
                        console.log('An error occurred.  Exiting the application.');
                        db.end();
                        return;
                    });
                break;
                
                case 'View all employees':
                    queryDB.getAllEmployees()
                    .then((employees) => {
                        console.table(employees);
                    mainMenu();
                    })
                    .catch((error) => {
                        console.error('Error viewing employees:', error);
                        console.log('An error occurred.  Exiting the application.');
                        db.end();
                        return;
                    });
                break;
                
                case 'Add a department':
                    inquirer
                        .prompt([
                            {
                                type: 'input',
                                name: 'departmentName',
                                message: 'Enter the name of the department:'
                            }
                        ])
                        .then((answers) => {
                            return queryDB.addDepartment(answers.departmentName);
                        })
                        
                        .then(() => {
                            console.log('Department added!');
                            mainMenu();
                        })
                        .catch((error) => {
                            console.error('Error adding department:', error);
                            console.log('An error occurred.  Exiting the application.');
                            db.end();
                            return;
                        });
                break;

                case 'Add a role':
                    queryDB.getAllDepartments()
                        .then((departments) => {
                            const departmentChoices = departments.map((department) => ({
                            name: department.name,
                            value: department.id,
                            }));

                    inquirer
                        .prompt([
                            {
                                type: 'input',
                                name: 'roleName',
                                message: 'Enter the name of the new role:',
                            },
                            {
                                type: 'input',
                                name: 'roleSalary',
                                message: 'Enter the salary for this new role:',
                                validate: function (input) {
                                return !isNaN(parseFloat(input)) && isFinite(input) ? true : 'Please enter a valid number for salary.';
                            },
                            },
                            {
                                type: 'list',
                                name: 'roleDepartmentID',
                                message: 'Select the department for this new role:',
                                choices: departmentChoices,
                            },
                        ])
                        .then((answers) => {
                            return queryDB.addRole(answers.roleName, answers.roleSalary, answers.roleDepartmentID);
                        })
                        .then(() => {
                            console.log('Role added!');
                            mainMenu();
                        })
                        .catch((error) => {
                            console.error('Error adding role:', error);
                            console.log('An error occurred. Exiting the application.');
                            db.end();
                            return;
                        });
                        })
                    
                    .catch((error) => {
                        console.error('Error getting departments list:', error);
                        console.log('An error occurred. Exiting the application.');
                        db.end();
                        return;
                    });
                break;

                case 'Add an employee':
                    queryDB.getAllRoles()
                        .then((roles) => {
                            roleChoices = roles.map((role) => ({
                                name: role.title,
                                value: role.id,
                            }));
                            return queryDB.getAllEmployees();
                        })
                        .then((employees) => {
                            const employeeChoices = employees.map((employee) => ({
                                name: `${employee.first_name} ${employee.last_name}`,
                                value: employee.id,
                            }));

                            inquirer
                                .prompt([
                                    {
                                        type: 'input',
                                        name: 'firstName',
                                        message: 'Enter the first name of the new employee:',
                                    },
                                    {
                                        type: 'input',
                                        name: 'lastName',
                                        message: 'Enter the last name of the new employee:',
                                    },
                                    {
                                        type: 'list', 
                                        name: 'roleId',
                                        message: 'Select the role for the new employee:',
                                        choices: roleChoices, 
                                    },
                                    {
                                        type: 'list', 
                                        name: 'managerId',
                                        message: 'Select the manager for the new employee:',
                                        choices: employeeChoices,
                                    },
                                ])
                                .then((answers) => {
                                    return queryDB.addEmployee(
                                        answers.firstName,
                                        answers.lastName,
                                        answers.roleId,
                                        answers.managerId
                                    );
                                })
                                .then(() => {
                                    console.log('Employee added!');
                                    mainMenu();
                                })
                                .catch((error) => {
                                    console.error('Error adding employee:', error);
                                    console.log('An error occurred. Exiting the application.');
                                    db.end();
                                });
                        })
                        .catch((error) => {
                            console.error('Error getting employee list:', error);
                            console.log('An error occurred. Exiting the application.');
                            db.end();
                        });
                    break;

                    case 'Update an employee role':
                        queryDB.getAllEmployees()
                            .then((employees) => {
                                const employeeChoices = employees.map((employee) => ({
                                    name: `${employee.first_name} ${employee.last_name}`,
                                    value: employee.id,
                                }));

                                queryDB.getAllRoles()
                                    .then((roles) => {
                                        const roleChoices = roles.map((role) => ({
                                            name: role.title,
                                            value: role.id,
                                        }));

                                        inquirer
                                            .prompt([
                                                {
                                                    type: 'list',
                                                    name: 'employeeID',
                                                    message: 'Select an employee to update:',
                                                    choices: employeeChoices,
                                                },
                                                {
                                                    type: 'list',
                                                    name: 'newRoleID',
                                                    message: 'Select a new role for the employee:',
                                                    choices: roleChoices,
                                                },
                                            ])
                                            .then((answers) => {
                                                queryDB.updateEmployeeRole(answers.employeeID, answers.newRoleID)
                                                    .then(() => {
                                                        console.log('Employee role updated!');
                                                        mainMenu();
                                                    })
                                                    .catch((error) => {
                                                        console.error('Error updating employee role:', error);
                                                        console.log('An error occurred. Exiting the application.');
                                                        db.end();
                                                    });
                                            });
                                    })
                                    .catch((error) => {
                                        console.error('Error getting roles list:', error);
                                        console.log('An error occurred. Exiting the application.');
                                        db.end();
                                    });
                            })
                            .catch((error) => {
                                console.error('Error getting employee list:', error);
                                console.log('An error occurred. Exiting the application.');
                                db.end();
                            });
                        break;
                
                case 'Exit':
                console.log('Goodbye!');
                db.end(); 
                return;
            }
            })
            
            .catch((error) => {
            console.error(error);
            });
            }

    mainMenu();

