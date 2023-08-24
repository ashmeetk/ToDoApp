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

# Frontend using AngularJS:
To start angular application, type ng serve and search http://localhost:4200/ in chrome. Password('dummy') is pre-filled in by default. Press enter to login into app. 

# Components used:
1. Menu component - Only 'Login' option is shown if user hasn't logged in or has logged out. Once user logs in, 'Home', 'Todos', and 'Logout' options start showing. For it to be shown across all pages, this component is embedded in app.component.html.
2. Footer component - For it to be shown across all pages, this component is embedded in app.component.html.
3. Error - In case an incorrect path is entered on chrome, error page is shown.
4. list-todos - When we click on menus 'todo' option, all todos are fetched and shown. We can add, delete or update todos from here.
5. todo - when we want add or update a todo, this form with description and date opens up. In case we need to add todo, we send id as -1 to todo component. Otherwise, in case we want to update a todo, we will pass the id to the todo component, inside todo component we will fetch all todo details, and show it on html page.
6. welcome - the first screen after login. On pressing 'Get Welcome Message', we get the message from HelloWorldController in the backend and display it to user.
7. login - We can use basic login or JWT login for logging in.
8. logout - once user clicks on logout, all the session storage variables, JWT token in case of JWT Auth, Basic Authentication token in case of basic Auth are deleted.

# Services used: 
1. todo-data.service.ts: It uses http to invoke put, post, get, delete todo api's from backend(TodoJpaResource).
2. welcome-data.service.ts: It uses http to invoke get api from backend(HelloWorldController).
3. basic-authentication.service.ts: intercepts all http requests and adds the basicAuthHeaderString to the request before it is sent to server, so that the request will go through successfully in case Basic Auth is enabled.
4. jwt-authentication.service.ts: At the time of login, executeJWTAuthenticationService() method is responsible for sending /authenticate request to backend to fetch a JWT token. So that all the api's invoked after user login would be able to use this token.
5. route-guard.service.ts - Explained in section below.

# Routing (app-routing.module.ts): 
The different routes can be checked inside app-routing.module.ts. The specific component is embedded in app.component.ts as <router-outlet> is embedded there. If the user hasn't logged in and is trying to access welcome or todos or logout route, he will be prevented for doing so with the help of RouteGuardService and will be routed instead to login component. For this you can check route-guard.service.ts.

# Tyes of Authentication:

1. JWT Authentication:
  Currently, the project is using JWT Authentication. We don't need to change anything.
  Principle: A JWT token is fetched from backend at the time of login and sent each time other APIs are invoked in the authorization header.
  Implementation: executeJWTAuthenticationService() method inside JWTAuthenticationService fetches JWT token at the time of login and stores it in session-storage. Other api's   
    fetch the value of this token through session storage and sent it as part of their authorization header.

3. Basic Authentication:
   Principle: A Base 64 encoded(username + password ) combination is sent each time with api requests to the backend so as to authorize the correct credentials are entered at the time of login and the authorized user only performs all other actions.
