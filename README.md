
# ShoppyGlobe-Backend

ShoppyGlobe Backend is the back-end server side implementation for the ShoppyGlobe e-commerce website. It handles user authentication, product management, cart functionality.


## Features

- Product Management : Get All Products, Add a new Product, Update a Product, Delete a Product, Get a product with its id
- User Management : User can signup and login by providing necessary details. Login is done by validating credintials from database.
- Cart Management : User can add item to cart, see all items in their cart, update an item quantity and delete an already added item in cart.
- Password is securily stored in database by Encrypting 
- JWT Token Authentication for Cart


## Installation

1. Access main directory

```bash
  cd shoppyglobe-backend-main
```

2. Install all npm packages 

```bash
  npm install
```

3. Run Nodemon

```bash
  npm start
```    
## Tech Stack

**Back-End:** Node.js, Express.js

**Database:** MongoDB

**Authentication:** JWT, bcrypt

