import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateVenueValidator {
  constructor (protected ctx: HttpContextContract) {
  }

	/*
	 * Define schema to validate the "shape", "type", "formatting" and "integrity" of data.
	 *
	 * For example:
	 * 1. The username must be of data type string. But then also, it should
	 *    not contain special characters or numbers.
	 *    ```
	 *     schema.string({}, [ rules.alpha() ])
	 *    ```
	 *
	 * 2. The email must be of data type string, formatted as a valid
	 *    email. But also, not used by any other user.
	 *    ```
	 *     schema.string({}, [
	 *       rules.email(),
	 *       rules.unique({ table: 'users', column: 'email' }),
	 *     ])
	 *    ```
	 */
  public schema = schema.create({
		name: schema.string({ trim: true }),
		address: schema.string({ trim: true }),
		phone: schema.string({}, [
			rules.mobile({
				locales: ['id-ID'],
				strict: true
			})
		])
  })

	/**
	 * Custom messages for validation failures. You can make use of dot notation `(.)`
	 * for targeting nested fields and array expressions `(*)` for targeting all
	 * children of an array. For example:
	 *
	 * {
	 *   'profile.username.required': 'Username is required',
	 *   'scores.*.number': 'Define scores as valid numbers'
	 * }
	 *
	 */
  public messages = {
		'name.required': 'tidak dapat di proses, {{ field }} tidak boleh kosong',
		'address.required': 'tidak dapat di proses, {{ field }} tidak boleh kosong',
		'phone.required': 'tidak dapat di proses, {{ field }} tidak boleh kosong',
		'phone.mobile': 'tidak dapat di proses, format {{ field }} tidak sesuai'
  }
}
