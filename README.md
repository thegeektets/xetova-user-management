# xetova-user-management


This application is build using AdonisJs https://docs.adonisjs.com/guides/introduction a nodejs framework

The features for the application are :-

- user authentication
- user management; create , update , deactivate

This repository only provides an API and no user interface for the application.

To start the development server copy the file .env.example to .env this will allow access to all configurations 
use the command:  node ace serve —watch to run the server

To run migration use : node ace migration:run

To build for production use : node ace build --production

Then cd build
node server.js


The endpoints:

to login use 

POST : /login

providing email and password, the response will contain a user_token and user_details. The application uses redis to manage tokens, these tokens are stored and validated using a remote redis store

User Endpoints - These endpoints are authenticated use the credentials : {"email": "griffinmuteti31@gmail.com",
    "password": "1234" } to generate a token then use that token in the following endpoints.

Listing users :

GET :/users

to add a new user use

POST :/user proving name, email, user_role, password

There are three user roles supported 1: admin , 2 : customer , 3 : staff , the default user role is 2 : customer

to get user_logs use

GET :/user_logs/{user_id}

User logs are recorded automatically every time a user token is used to perform an action.