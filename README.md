#react #express #typescript #postgres #prisma #cloudinary #backend #assembler-institute-of-technology #master-in-software-engineering

# MOVIEHUB_PROJECT - BACKEND 

Welcome to the Movie Platform Backend! This backend service provides functionality for users to upload their favorite movies, rate them, and assign genres. The project is built using TypeScript and utilizes Prisma for database management. It supports both MongoDB and PostgreSQL databases, offering flexibility in backend data storage solutions.

# TABLE OF CONTENTS 

Instructions
 - Data Model:
    - Users
    - Movies
    - Genres

Part 1
    - Backend with Express, TypeScript, and Node.js

Part 2
    - MVC Structure and MongoDB with Mongoose
Part 3
    - Refactoring with Prisma
Part 4
    - Data Model Migration to PostgreSQL and Multi-client Prisma Support
Part 5
    - Estructure of project

Technologies Used
Contribution


# INSTRUCTIONS 

DATA MODEL:

👤 Users
The Users collection stores information about the application users. 

Each user has the following fields:

- id: A unique identifier for the user.
- name: The user's name.
- email: The user's email address.
- password: The user's password, securely stored.
- movies: A list of movies that the user has added to their list.
- genres: The movie's genre, stored as a reference to the corresponding genre document.

🎬 Movies
The Movies collection stores information about the movies that users have added to their list. 

Each movie has the following fields:

- id: A unique identifier for the movie.
- name: The movie's name.
- poster_image: The URL of the movie poster image, stored in Cloudinary.
- score: The movie's score, assigned by the user when adding the movie to their list.
- genre: The movie's genre, stored as a reference to the corresponding genre document.

🏷️ Genres
The Genres collection stores the different movie genres that users can select when adding a movie to their list. 
Each genre has the following fields:

- id: A unique identifier for the genre.
- name: The genre's name.

These are the basic data models that we will use in this project. 


# PART 1
    
Backend with Express, TypeScript, and Node.js: 

- Requirements
Install Node.js and npm on your local machine.
Have basic knowledge of JavaScript and TypeScript.

- Steps
Development environment setup: Create a new folder for your project and initialize a new Node.js project with npm. Install the necessary dependencies for Express and TypeScript.

Express configuration: Create a new Express server file and configure it to listen on a port of your choice.

TypeScript configuration: Create a TypeScript configuration file (tsconfig.json) and configure it for your project.

Server creation: Use Express and TypeScript to create a basic server that can handle HTTP requests (GET, POST, PUT, PATCH, DELETE).

Server testing: Use a tool like Postman to send requests to your server and verify that it is working correctly.


# PART 2

MVC Structure and MongoDB with Mongoose:

In this part, the objective is to organize the backend structure using the Model-View-Controller (MVC) design pattern and establish a connection to MongoDB using Mongoose.

Before proceeding, it's crucial to grasp the data structure we'll be dealing with in our application. We'll be managing three primary collections in our MongoDB database:

Users: This collection will contain user data such as names, emails, and passwords.

Movies: Here, we'll store information about movies, including their titles, poster images, scores, and genres.

Genres: This collection will manage various movie genres available, each represented by a name.


# PART 3

Refactoring with Prisma. 

# PART 4 

Data Model Migration to PostgreSQL and Multi-client Prisma Support: migrate your data model from MongoDB to PostgreSQL and add support for multiple Prisma clients.

# TECHNOLOGIES USED 

- Prisma
- MongoDB
- PostgreSQL
- Express-fileupload
- Fs-extra
- Node.js
- Express.js
- TypeScript

# CONTRIBUTION
If you wish to contribute to this project, we welcome you! Please follow these guidelines:

Fork the repository. Create a branch for your contribution: git checkout -b my-contribution. Make your changes and commit them: git commit -m "Add my contribution". Push your changes to your repository: git push origin my-contribution. Create a pull request on GitHub.

Author This project was created by José María Gil López.










