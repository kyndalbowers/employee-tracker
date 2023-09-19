const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Chickenfingers',
    database: 'employee_db' 
});

class Database {
    constructor() {
        
        this.db = mysql.createConnection({
        host: 'your_host',
        user: 'your_username',
        password: 'your_password',
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
}

module.exports = Database;
