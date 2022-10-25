// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import UserRepository from "App/Repositories/userRepository";
import UserValidator from "App/Validators/UserValidator";

export default class UsersController {
    repo: any;
    constructor() {
        this.repo = new UserRepository();
    }
    async index({ request, response }) {
        let params = request.all();
        request.res = await this.repo.getUsers(params);
        return response.status(request.res.statusCode).send(request.res.data);
    }

    async create({ request, response }) {
        await request.validate(UserValidator);
        let payload = request.all();
        request.res = await this.repo.createUser(payload);
        return response.status(request.res.statusCode).send(request.res.data);
    }

    async update({ request, response }) {
        await request.validate(UserValidator);
        let userId = request.params();
        let payload = request.all();
        request.res = await this.repo.updateUser(userId,payload);
        return response.status(request.res.statusCode).send(request.res.data);
    }

    async fetch({ request, response }) {
        let payload = request.params();
        console.log("fetch single user", payload);
        request.res = await this.repo.getUser(payload);
        return response.status(request.res.statusCode).send(request.res.data);
    }
}
