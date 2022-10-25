import { schema, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class AuthValidator {
  constructor(protected ctx: HttpContextContract) { }


  public schema = schema.create({
    email: schema.string({}, [
      rules.email()
    ]),
    password: schema.string(),
  })


  public messages = {
    'email.required': 'Email is required',
    'password.required': 'Password is required',
  }
}
