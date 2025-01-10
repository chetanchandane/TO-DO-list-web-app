
# TodoList v1

This project is a simple **Todo List** web application built with **Node.js**, **Express**, and **MongoDB**. It allows users to create and manage daily tasks, organize tasks into custom lists, and delete tasks when completed.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Environment Variables](#environment-variables)
- [Usage](#usage)

---

## Features

- **Task Management**: Add, view, and delete tasks.
- **Custom Lists**: Create dynamic custom lists (e.g., Work, Groceries, etc.).
- **Database Integration**: Stores tasks and lists in MongoDB.
- **Dynamic Views**: Renders pages dynamically using EJS templates.
- **CRUD Operations**: Full CRUD (Create, Read, Update, Delete) functionality for tasks.

---

## Technologies Used

- **Node.js**: Backend runtime environment.
- **Express**: Web framework for building APIs and handling routes.
- **MongoDB**: Database for storing tasks and lists.
- **Mongoose**: ODM (Object Data Modeling) library for MongoDB.
- **EJS**: Templating engine for dynamic views.
- **Body-Parser**: Middleware for parsing form data.
- **Lodash**: Utility library for string and data manipulation.

---

## Installation

### Prerequisites

Ensure you have the following installed:

- **Node.js**: [Download and install Node.js](https://nodejs.org/)
- **MongoDB**: [Set up MongoDB](https://www.mongodb.com/try/download/community)

### Steps to Install

1. Clone the repository:
   ```bash
   git clone https://github.com/chetanchandane/TO-DO-list-web-app.git
   cd TO-DO-list-web-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

---

## Running the Application

1. Start your MongoDB server:
   ```bash
   mongod
   ```

2. Start the application:
   ```bash
   node app.js
   ```

3. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```


---

## Environment Variables

Currently, this project does not require environment variables. However, you can configure the MongoDB URI in `app.js`:

```javascript
mongoose.connect("mongodb://localhost:27017/todolistDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});
```

To connect to a remote MongoDB instance, replace the connection string with your MongoDB Atlas URI.

---

## Usage

1. **Default List**:
   - Navigate to `http://localhost:3000` to view the default "Today" list.
   - Add tasks using the input field and submit button.
   - Delete tasks by checking the checkbox.

2. **Custom Lists**:
   - Access custom lists by appending a list name to the URL (e.g., `http://localhost:3000/work`).
   - A new custom list will be created if it doesn't already exist.

