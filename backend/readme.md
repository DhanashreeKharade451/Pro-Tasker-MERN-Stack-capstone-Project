<!-- *****************Backend development -->

Started Backend Development of My full Stack Mern project "Pro-Tasker-MernStack-capstone-Project/"

<!--******************* API Design************************ -->
Project API Overview

The Project API is a core part of the backend, built using Node.js, Express.js, and MongoDB with Mongoose. It provides full CRUD functionality for managing user-specific projects.

All endpoints are protected using authentication middleware, ensuring that only logged-in users can access and manage their own data.

*************************************************************************
Authentication & Authorization
All project routes require a valid JWT token.
The JSON Web Token (JWT) is passed in the request header.
Each request is verified using middleware to ensure the user is authenticated.
Authorization checks are implemented to ensure that users can only access, update, or delete their own projects.
**********************************************************************************

API Endpoints
➤ Create Project

POST /api/projects

Creates a new project for the logged-in user.
Requires:
name
description
➤ Get All Projects

GET /api/projects

Retrieves all projects created by the logged-in user.
Ensures users only see their own projects.
➤ Get Single Project

GET /api/projects/:id

Fetches a specific project by ID.
Includes an authorization check to ensure ownership.
➤ Update Project

PUT /api/projects/:id

Updates project details (name, description, etc.).
Only the project owner can update the project.
➤ Delete Project

DELETE /api/projects/:id

Deletes a project by ID.
Also deletes all tasks associated with that project (cascade delete).
Ensures only the owner can delete the project.
🔄 Nested Task Routes

Tasks are managed as nested resources under projects:

/api/projects/:projectId/tasks
Ensures tasks always belong to a specific project.
Authorization ensures the user owns the parent project before accessing tasks.
*********************************************************************************