INSERT INTO department (id,department_name)
VALUES (1,'Finance'),
       (2,'Sales'),
       (3,'Legal'),
       (4,'Engineering');

INSERT INTO roles (id,roles_title,roles_salary,department_id)
VALUES (1,'Accountant',60000.00,1),
       (2,'Accounting Manager',100000.00,1),
       (3,'Sales Representative',40000.00,2),
       (4,'Sales Manager',80000.00,2),
       (5,'Lawyer',90000,3),
       (6,'Legal Team Manager',120000.00,3),
       (7,'Sofware Engineer',75000.00,4),
       (8,'Engineering Team Manager',150000.00,4);

INSERT INTO employee (id,first_name,last_name,role_id,manager_id)
    VALUES 
           (3,'Olivia','Turner',2,NULL),
           (6,'Noah','Anderson',4,NULL),
           (8,'Mason','Walker',6,NULL),
           (11,'Harper','Henderson',8,NULL);
           
           
          INSERT INTO employee (id,first_name,last_name,role_id,manager_id)
    VALUES (1,'Emma','Thompson',1,3),
           (2,'Daniel','Martinez',1,3),
           (4,'Ethan','Rivera',3,6),
           (5,'Ava','Gonzales',3,6),
           (7,'Isabella','Nelson',5,8),
           (9,'Grace','Mitchell',7,11),
           (10,'Alexander','Sanders',7,11);