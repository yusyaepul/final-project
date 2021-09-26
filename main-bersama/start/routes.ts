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

Route.group(() => {
    Route.resource('venues', 'VenuesController').apiOnly().middleware({ show: ['auth', 'verify'] })
    Route.resource('venues.fields', 'FieldsController').apiOnly().middleware({ store: ['auth', 'verify'] })

    Route.post('/fields/:id/bookings', 'BookingsController.bookings').as('bookings').middleware(['auth', 'verify'])
    Route.get('/fields/:id', 'FieldsController.show').as('fields.show').middleware(['auth', 'verify'])
    Route.get('/bookings/:id', 'BookingsController.show').as('bookings.show').middleware(['auth', 'verify'])
    Route.post('/bookings/:id', 'BookingsController.store').as('pembooking').middleware(['auth', 'verify'])

    Route.post('/register', 'AuthController.register').as('auth.register')
    Route.post('/login', 'AuthController.login').as('auth.login')
    Route.post('/verifikasi-otp', 'AuthController.otpConfirmation').as('auth.Otp')

    Route.get('/hello', 'TestsController.hello').as('hello')
}).prefix('/api/v1').as('apiv1')