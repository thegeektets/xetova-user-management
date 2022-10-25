// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import AuthRepository from "App/Repositories/authRepository";
import AuthValidator from "App/Validators/AuthValidator";



export default class AuthController {
    repo: any;
    constructor() {
        this.repo = new AuthRepository();
    }
    async login({ auth, request, response }) {
        let validation = await request.validate(AuthValidator);
        console.log(validation);

        const data = request.only(["email", "password"]);
        request.loginResponse = await this.repo.loginUser(auth, data);
        return response.status(request.loginResponse.statusCode).send(request.loginResponse.data);
    }
}
