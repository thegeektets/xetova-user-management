/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

import Env from '@ioc:Adonis/Core/Env'


Route.get('/', ({ response }) => {
  response.json({
    status: true,
    environment: Env.get('NODE_ENV'),
    message: "Hello World! Welcome to Xetova",
  })
})


/** Guest routes */
Route.group(() => {
  Route.post('login', 'AuthController.login')
}).namespace('App/Controllers/Http/auth')



Route.group(() => {
  Route.post('user', 'UsersController.create')
  Route.put('user/:id', 'UsersController.update')
  Route.get('user/:id', 'UsersController.fetch')
  Route.get('users/', 'UsersController.index')
}).middleware('auth').namespace('App/Controllers/Http/user')
