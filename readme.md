Pro-Tasker – MERN Stack Project Management App
1.................Project Description:
////////////////////

ro-Tasker is a full-stack project management application built using the MERN stack (MongoDB, Express, React, Node.js). It allows users to create and manage projects, organize tasks, and track progress efficiently.

The application is designed to be intuitive for individual users while also supporting collaborative workflows for small teams. Users can securely register, log in, create projects, and manage tasks within those projects using a clean and responsive interface.
***************************************************************************************
Key features include:
*******************
Secure user authentication using JWT
Full CRUD functionality for projects and tasks
Task status tracking (To Do, In Progress, Done)
Protected routes and authorization
Scalable backend API with RESTful design
***************************************************************************************
2.................Instructions to Set Up and Run Locally:

To run the Pro-Tasker application locally, both the backend and frontend must be configured and started.

1. Clone the Repository

Download the project from your version control system (e.g., GitHub) to your local machine.

2. Backend Setup

Navigate to the backend folder and install all required dependencies.
Create an environment configuration file to store sensitive data such as the database connection string and JWT secret key.
Start the backend server. It will run on a local port (commonly 3000)

3. Frontend Setup

Navigate to the frontend folder and install the required dependencies.
Start the frontend development server. The application will typically run on a different port (such as 5173).

4. Database Connection

Ensure that MongoDB Atlas (or local MongoDB) is properly connected using the connection string in your environment file.

5. Authentication Requirement

To access protected routes, users must log in. A JWT token is generated upon login and must be included in API requests for authorization.
***************************************************************************************
3.***************************API Endpoints Overview*****************
***********************

The backend follows a RESTful API structure. All endpoints related to projects and tasks are protected and require authentication.

*************************************************************************************
Authentication Endpoints

Register User
Allows a new user to create an account by providing a username, email, and password.

Login User
Authenticates an existing user and returns a JWT token that is used for accessing protected routes.
************************************************************************************
Project Management Endpoints

Get All Projects
Retrieves all projects created by the logged-in user.

Create Project
Allows a user to create a new project by providing a name and description.

Get Single Project
Fetches details of a specific project using its unique identifier.

Update Project
Allows the project owner to update project details such as name or description.

Delete Project
Allows the project owner to delete a project. Associated tasks are also removed.
**************************************************************************************
Task Management Endpoints (Nested under Projects)

Get Tasks for a Project
Retrieves all tasks associated with a specific project.

Create Task
Allows the user to create a new task within a project, including title, description, and status.

Update Task
Allows updating task details such as title, description, or status.

Delete Task
Removes a task from a project.
************************************************************************************
Authentication & Authorization:

All project and task-related operations require authentication.
JWT tokens are used to verify user identity.
Only the owner of a project is authorized to update or delete it.
Task operations are restricted to users who have access to the project.
***************************************************************************************
*                     Thank You                                                       *
***************************************************************************************
