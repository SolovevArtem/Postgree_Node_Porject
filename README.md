# db-project-solovev


This webapp was uploaded to heroku and can be viewed here: [https://db-project-solovev.herokuapp.com](https://db-project-solovev.herokuapp.com)

This web application is attached to a database, using sequelize.js and PostgreSQL. 
All queries make calls to the tables in PostgreSQL to make any CRUD operations.
In addition, a MongoDB database was attached for storing users accounts. You can must create an account and login in order to view the employees. 
Alternatively you can login with the following to view the app.



The following queries are available:
```
/employees?status
```
This returns a list of employees filtered by status, either "Full Time" or "Part Time". For example `/employees?status=Full Time` returns a list of employees that have "Full Time" status

```
/employees?department
```
This returns a list of employees filtered by department. For example `/employees?department=1` returns a list of employees that are in department 1.


```
/employees?manager
```
This returns a list of employees filtered by their manager number. For example `/employees?manager=1` returns a list of employees who's manager's employee number is 1.


```
/employee/:num
```
This returns the result of searching for an employee by their employee number. For example `/employee/2` will return employee number 2.
This page allows you to edit and update the employee's information.

*Please note that these queries cannot be chained together.*

