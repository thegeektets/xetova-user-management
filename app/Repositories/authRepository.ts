import User from 'App/Models/User'
import Hash from '@ioc:Adonis/Core/Hash'



export default class AuthRepository {

    async loginUser(auth, data) {
        let { email, password } = data;
        //get user details
        let user = await User.findBy('email', email);
        if (!user) {
            return {
                statusCode: 404,
                data: {
                    message: 'Invalid email, user not found'
                },
            }
        }
        let userPassword = user?.password;


        if (!userPassword) {
            return {
                statusCode: 400,
                data: {
                    message: 'Invalid request, user password not set.Kindly set a new password to proceed'
                },
            }
        }


        const isSame = await Hash.verify(userPassword, password);

        console.log("isSame", isSame);

        if (isSame) {
            const token = await auth.use('api').generate(user)

            console.log("token", token);


            return {
                statusCode: 200,
                data: {
                    user: user,
                    token: token,
                    message: "Login successful"
                }
            }
        }
        return {
            statusCode: 400,
            data: {

                message: "Invalid credentials, kindly check your password and email"
            }
        }
    }
}