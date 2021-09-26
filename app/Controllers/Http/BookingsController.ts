import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CreateBookingValidator from 'App/Validators/CreateBookingValidator'

import Booking from 'App/Models/Booking'
import Database from '@ioc:Adonis/Lucid/Database'

export default class BookingsController {
    
    public async store({ auth, response, params }: HttpContextContract){

        try {

            let authUser = auth.user
            let user_id = authUser?.id

            await Database.table('booking_user').insert({
                    user_id: user_id,
                    booking_id: params.id
                })
            response.ok({ message: 'Berhasil join booking' })

        } catch (error) {

            response.unprocessableEntity({ 
                errors: error.messages 
            })

        }

    }

    public async bookings({ auth, request, response, params }: HttpContextContract){
        try {
            let fields_id = params.id
            await request.validate(CreateBookingValidator)
            
            let newBooking = new Booking()
                newBooking.play_date_start = request.input('play_date_start')
                newBooking.play_date_end = request.input('play_date_end')
                newBooking.fields_id = fields_id

            const authUser = auth.user
            authUser?.related('bookings').save(newBooking)

            if(response){
                await Database.table('booking_user').insert({
                    user_id: authUser?.id,
                    booking_id: newBooking.id
                })
            }

            response.created({ message: 'Berhasil booking!', newId: newBooking.id })
           
        } catch (error) {

            response.badRequest({ message: error.message })
            
        }
    }

    public async show({ response, params }: HttpContextContract){
        //let venue_id = params.venue_id
        let booking = await Booking
                    .query()
                    .select('id', 'users_id', 'fields_id', 'play_date_start', 'play_date_end')
                    .withCount('players', (query) => {
                        query.as('players_count')
                    })
                    .preload('players', (query) => {
                        query.select('id', 'name', 'email')
                    })
                    .where('id', params.id)
                    .firstOrFail()

        const { id, users_id, fields_id, play_date_start, play_date_end, players } = booking.toJSON()
        const players_count = booking.$extras.players_count
        return response.ok({ message: 'Sukses ambil data!', data: { id, fields_id, play_date_start, play_date_end, users_id, players_count, players } })
    }

}
