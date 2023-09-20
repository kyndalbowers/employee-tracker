const Database = require('./queries');
const queryDB = new Database();

async function testGetAllDepartments() {
    try {
        const departments = await queryDB.getAllDepartments();
        console.log('All Departments:', departments);
    } catch (error) {
        console.error('Error:', error);
    }
}

testGetAllDepartments();
