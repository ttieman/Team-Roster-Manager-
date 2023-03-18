SELECT * FROM department;

SELECT 
    employed.id AS ID, 
    employed.first_name AS First_Name, 
    employed.last_name AS Last_Name, 
    roles.roles_title AS Role,
    department.department_name AS Department, 
    roles.roles_salary AS Salary, 
    managed.first_name AS Manager
FROM employee employed
INNER JOIN roles ON employed.role_id = roles.id
INNER JOIN department ON roles.department_id = department.id
LEFT JOIN employee managed ON employed.manager_id = managed.id;



SELECT roles.id AS ID, roles_title AS Role, roles_salary AS Salary, department_name AS Department FROM roles INNER JOIN department ON roles.department_id = department.id;