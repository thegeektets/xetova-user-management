import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class AccountSetupValidator {
	constructor(protected ctx: HttpContextContract) {
	}

	public schema = schema.create({
		email: schema.string({}, [
			rules.email()
		]),
		name: schema.string(),
		user_role: schema.number(),
	})


	public messages = {

	}
}
