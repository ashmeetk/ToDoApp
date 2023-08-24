# ToDoApp
A todo app is generated using Spring Boot and Angular JS which talks to in-memory H2 database to perform CRUD operations on todo table. Spring Security is used to configure basic auth and JWT Auth.  

# Credentials: 
Username: ashmeet
Password: dummy

# Workflow: 
When a user logs into the app by entering credentials(LOGIN COMPONENT), he is directed to a welcome page. Clicking on 'Get Welcome Message', he gets msg - Hello There Ashmeet (WELCOME COMPONENT). By clicking on Todos in the top menu, the list of all todos appear(LIST-TODOS component). A user can add, update or delete a todo (TODO component).

# Data Validation Logic: 
Description of todo: required field with minimum 5 chars.
Date: required field

# Database: 
An in-memory H2 database is used whose data gets refreshed everytime the project is refreshed. After starting SpringBoot app, enter: http://localhost:8080/h2-console in chrome and enter: jdbc:h2:mem:testdb and enter 'Connect'. The details are pre-populated into todo table with help of data.sql under application.properties file with help of JDBC. With help of JPA, whenever we define @Entity on top of model class, specific table gets added inside H2 database automatically.

# Backend: 
Run the app as Spring Boot Application and it gets started on port 8080.

# API's used for JWT Authentication:
{username}: ashmeet
{id}: 10001 or 10002 or 10003

1. To get a JWT Token(This is only specific to postman and if we would need to invoke all other APIs through postman)
Method: POST
API: http://localhost:8080/authenticate
RequestBody:{
              "username": "ashmeet",
              "password": "dummy"
            }
Response: Copy the JWT token

2. To get hello msg when user clicks on 'Get Welcome Message button'.
Method: GET
API: http://localhost:8080/hello-world-bean/path-variable/{username}
Authorization: Select Bearer token and in token field paste the JWT token that was copied earlier.(Only when api is invoked through postman)

3. To get list of all todos
Method: GET
API: http://localhost:8080/jpa/users/${username}/todos
Authorization: Select Bearer token and in token field paste the JWT token that was copied earlier.(Only when api is invoked through postman)

4. To get a todo
Method: GET
API: http://localhost:8080/jpa/users/${username}/todos/${id}
Authorization: Select Bearer token and in token field paste the JWT token that was copied earlier.(Only when api is invoked through postman)

5. to create a new todo
Method: POST
API: http://localhost:8080/jpa/users/${username}/todos
RequestBody: {
               "id": 10001,
               "username": "ashmeet",
               "description": "Learn JPA",
               "targetDate": "2023-08-24T09:44:50.825+00:00",
               "done": false
             }
Authorization: Select Bearer token and in token field paste the JWT token that was copied earlier.(Only when api is invoked through postman)

6. to update an existing todo
Method: PUT
API: http://localhost:8080/jpa/users/${username}/todos/${id}
RequestBody: {
                "username": "ashmeetK",
                "description": "Learn JPA",
                "targetDate": "2023-08-24T09:44:50.825+00:00",
                "done": false
             }
Authorization: Select Bearer token and in token field paste the JWT token that was copied earlier.(Only when api is invoked through postman)

8. to delete a specific todo  
Method: DELETE
API: http://localhost:8080/jpa/users/${username}/todos/${id}
Authorization: Select Bearer token and in token field paste the JWT token that was copied earlier.(Only when api is invoked through postman)

# CLASSES DESCRIPTION:
1. com.ashmeet.rest.webservices.restfulwebservices.jwt package: contains all JWT authentication code.
2. com.ashmeet.rest.basic.auth package: contains all basic authentication code.
3. .helloworld package: contains welcome message code, nothing to do with performing CRUD operations on todos.
4. Todo class: Entity class.
5. TodoJpaRepository interface: Performs CRUD operations with the help of JPA on h2 database.
6. TodoJpaResource class: Controller with all apis

# Frontend:

