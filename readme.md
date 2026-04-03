***************************************************************************************

Frontend Documentation
********************
 Overview

The frontend of this application is built using React and provides an interactive user interface for managing projects and tasks. It communicates with a backend API to perform authentication and CRUD operations.

Tech Stack
React (with Hooks)
React Router DOM (for client-side routing)
Axios (for API communication)
Context API (for global state management)
**********************************************************************************
Authentication Flow:
*******************
Users can register and log in.
On successful login/register:
JWT token is stored in localStorage.
User data is stored in Context API.
Axios automatically attaches the token to all API requests.
Protected routes prevent unauthorized access.
**********************************************
Routing:

Route	Description
/login	User login page
/register	User registration page
/dashboard	User dashboard
/projects	List of all projects
/projects/:id	Single project with tasks
**********************************************************************
State Management

The Context API is used to:

Store authenticated user data
Manage login/logout functionality
Provide user state across all components
***********************************************************************************************
API Integration:

All API requests are handled using Axios.

Example:
await API.get("/projects");
await API.post("/users/login", formData);
Token Handling:
JWT token is stored in localStorage
Automatically added to request headers:
Authorization: Bearer <token>
*************************************************************************
Features
* User Features:
Register new account
Login/logout
Persistent authentication

* Project Features:
Create new project
View all projects
Delete projects

 Task Features:
Create tasks under a project
View tasks per project
Update task status
Delete tasks

****************************************************************
Protected Routes

Routes like /projects and /dashboard are protected and require authentication.
**********************************
Loading & Error Handling:

Loading states are shown during API calls
Errors are handled and displayed to users 
**********************************************
How to Run Frontend
Navigate to frontend directory:
cd client
Install dependencies:
npm install
Start development server:
npm run dev
Open in browser:
http://localhost:5173

**************************************************
????????????
My DashBoard should show :
Welcome user
✅ Total projects
✅ Quick project list
✅ Button to create project
✅ Navigation to project details
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
**************************************************************************************************************************************************************