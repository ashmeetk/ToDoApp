# ToDoApp
A todo app is generated using Spring Boot and Angular JS which talks to in-memory H2 database to perform CRUD operations on todo table. Spring Security is used to configure basic auth and JWT Auth.  

Credentials: 
Username: ashmeet
Password: dummy

Workflow: When a user logs into the app by entering credentials(LOGIN COMPONENT), he is directed to a welcome page. Clicking on Get Welcome Message, he gets msg - Hello There Ashmeet (WELCOME COMPONENT). By clicking on Todos in the top menu, the list of all todos appear(LIST-TODOS component). A user can add, update or delete a todo.

Data Validation Logic: 
Description of todo: required field with minimum 5 chars.
Date: required field

Database: An in-memory H2 database is used whose data gets refreshed everytime the project is refreshed. After starting SpringBoot app, enter: http://localhost:8080/h2-console in chrome and enter: jdbc:h2:mem:testdb and enter Connect. The details are pre-populated into todo table with help of data.sql under application.properties file with help of JDBC. With help of JPA, whenever we define @Entity on top of model class, specific table gets added inside H2 database automatically.
