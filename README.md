# xetova-user-management


This application is build using AdonisJs https://docs.adonisjs.com/guides/introduction a nodejs framework

The features for the application are :-

- user authentication
- user management; create , update , deactivate

This repository only provides an API and no user interface for the application.

To start the development server use the command:  node ace serve —watch

To build for production use : node ace build --production

To run migration use : node ace migration:run

Then cd build
node server.js

to login use 

POST : /login

providing email and password, the response will contain a user_token and user_details.

to list users use

GET :/users

to add a new user use

POST :/user proving name, email, user_role, password

There are three user roles supported 1: admin , 2 : customer , 3 : staff , the default user role is 2 : customer

to get user_logs use

GET :/user_logs/{user_id}

User logs are recorded automatically everytime a user token is used to perform an action.