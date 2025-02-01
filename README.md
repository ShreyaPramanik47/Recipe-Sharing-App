# 🍽️ Recipe Sharing App

A backend-application where users can share, manage, and explore recipes. **Recipe Sharing Application** built using **Node.js, Express, MongoDB, and JWT Authentication**. Users can create, update, delete, and browse recipes.

## 🚀 Features

- 🔐 User Authentication (JWT-based)
- 📌 Add, update, and delete recipes
- 📄 View all recipes with pagination
- 📩 Search and filter recipes

## 🛠️ Tech Stack

- **Backend:** Node.js, Express.js, MongoDB (Mongoose)
- **Authentication:** JSON Web Token (JWT)
- **Database:** MongoDB Atlas / Local MongoDB


## 🔑 API Endpoints

### **Authentication**
- `POST /auth/signup` - Register a new user
- `POST /auth/login` - User login and get JWT token

### **Recipes**
- `POST /recipes` - Create a new recipe (with token)
- `GET /recipes` - Get all recipes (with pagination)  
- `GET /recipes/:id` - Get a specific recipe by ID 
- `PUT /recipes/:id` - Update an existing recipe  
- `DELETE /recipes/:id` - Delete a recipe

### **Favourites**
- `POST /favorites/:recipeId` - Post Favorite a recipe.    
- `GET /favorites` - Get all favorited recipes of a particular user


