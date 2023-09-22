const mysql = require('mysql2');

class Database {
    constructor() {
        
        this.db = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'Chickenfingers',
        database: 'employee_db'
        });
    }

    getAllDepartments() {
        return new Promise((resolve, reject) => {
        this.db.query('SELECT * FROM department', (err, results) => {
        
            if (err) {
            return reject(err);
        }
            resolve(results);
            });
        });
    }

    getAllRoles() {
        return new Promise((resolve, reject) => {
        this.db.query('SELECT * FROM role', (err, results) => {
        
            if (err) {
            return reject(err);
        }
            resolve(results);
            });
        });
    }

    getAllEmployees() {
        return new Promise((resolve, reject) => {
        this.db.query('SELECT * FROM employee', (err, results) => {
        
            if (err) {
            return reject(err);
        }
            resolve(results);
            });
        });
    }

    addDepartment(name) {
        return new Promise((resolve, reject) => {
        this.db.query('INSERT INTO department (name) VALUES (?)', [name], (err, result) => {
        
            if (err) {
            return reject(err);
        }
        resolve(result);
            });
        });
    }

    addRole(title, salary, departmentID) {
        return new Promise((resolve, reject) => {
            this.db.query(
                'INSERT INTO role (title, salary, department_id, department_name) VALUES (?, ?, ?, ?)',
                [title, salary, departmentID, null],
                (err, result) => {
                    if (err) {
                        return reject(err);
                    }
                    resolve(result);
                }
            );
        });
    }
    

    addEmployee(firstName, lastName, role_id, manager_id) {
        return new Promise((resolve, reject) => {
            this.db.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)', [firstName, lastName, role_id, manager_id], (err, result) => {
                if (err) {
                    return reject(err);
                }
                resolve(result);
            });
        });
    }

    updateEmployeeRole(employeeID, newRoleID) {
        return new Promise((resolve, reject) => {
            const query = 'UPDATE employee SET role_id = ? WHERE id = ?';
            this.db.query(query, [newRoleID, employeeID], (err, result) => {
                if (err) {
                    reject(err);
                    return;
                }
            resolve(result);
            });
        });
    }
}

module.exports = Database;
