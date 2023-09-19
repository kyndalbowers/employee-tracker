INSERT INTO department (name) VALUES
    ('Sales'),
    ('Engineering'),
    ('Marketing'),
    ('Recruiting'),
    ('Finance');

INSERT INTO role (title, salary, department_id) VALUES
    ('Sales Manager', 80000.00, 1),
    ('Software Engineer', 90000.00, 2),
    ('Marketing Specialist', 60000.00, 3),
    ('Technical Recruiter', 70000.00, 4),
    ('Financial Analyst', 75000.00, 5);

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
    ('John', 'Doe', 1, NULL),
    ('Jane', 'Smith', 2, NULL),
    ('Bob', 'Johnson', 3, NULL),
    ('Alice', 'Brown', 4, 1),
    ('Eva', 'White', 5, 1);