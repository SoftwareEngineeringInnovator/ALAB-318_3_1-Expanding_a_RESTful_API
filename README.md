# ALAB 318.3.1 - Expanding a RESTful API

# RESTful API Expansion (Users, Posts & Comments)

## Description
Hey there! This project is a hands-on backend lab built for **ALAB 318.3.1 - Expanding a RESTful API** as part of my Software Engineering coursework at Per Scholas. 

The core goal of this assignment was to take an existing, legacy Express starter API (which only had routes for `users` and `posts`) and expand its ecosystem. I introduced a brand-new `comments` data resource, built out a full suite of nested and filtered CRUD routes, implemented relational data linkages, and integrated custom middleware including an API key authorization gate and global error routing. 

Since we aren't connected to a live database yet, all relational data structures are modeled and manipulated using in-memory JavaScript arrays.

---

## Technical Features & Requirements Met
This application implements several core backend concepts:

* **Modular Express Routing:** Kept code highly maintainable and readable by breaking `users`, `posts`, and `comments` into their own dedicated route files under a clean directory architecture.
* **Relational Data Mapping:** Linked independent data arrays together using primary reference IDs (`userId` and `postId`) to simulate a relational database structure.
* **Advanced Query Parameter Filtering:** Implemented dynamic query filters (e.g., `?userId=1` or `?postId=2`) to allow users to drill down into specific data segments.
* **Deeply Nested URL Interactivity:** Created complex route pathways (like `/api/posts/:id/comments?userId=<value>`) to handle multi-layered resource lookups.
* **API Key Security Middleware:** Features an operational gate checking for valid authorization keys (`perscholas`, `ps-example`) before granting access to `/api` routes.
* **Custom Error Handling Architecture:** Utilizes a centralized, custom error utility alongside an active 404/500 middleware stack to safely intercept bad client requests without crashing the server process.
* **HATEOAS Integration:** Explores baseline REST maturity concepts by embedding hypermedia foundational links directly inside the index landing responses.

---

## Tech Stack
* **Runtime Environment:** Node.js
* **Backend Framework:** Express.js
* **Development Tooling:** Nodemon (for hot-reloading)
* **Testing Client:** Thunder Client (VS Code)
* **Language/Standard:** JavaScript (ES Modules / `import` syntax)

---

## Project Structure
```text
ALAB-318_3_1-Expanding_a_RESTful_API/
│
├── data/                    
│   ├── comments.js          
│   ├── posts.js
│   └── users.js
│
├── routes/                  
│   ├── comments.js          
│   ├── posts.js
│   └── users.js
│
├── utilities/               
│   └── error.js             
│
├── index.js                 
├── package.json             
└── README.md
```

## Author

Fredy Chilito-Ramos - Software Engineering Innovator - PerScholas Software Engineering Student
Created as part of the Per Scholas Software Engineering Program.
Project Topic: Expanding a RESTful API.