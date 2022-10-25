import Hash from '@ioc:Adonis/Core/Hash';
import User from 'App/Models/User'

export default class UserRepository {

    async createUser(data) {
        try {
            let { name, email, user_role, password } = data;
            let hashedPassword = await Hash.make(password);


            const user = new User();
            user.name = name;
            user.email = email;
            user.user_role = user_role;
            user.password = hashedPassword;
            await user.save()

            //store otp
            // probably use a cache - firebase ?
            return {
                statusCode: 200,
                data: {
                    message: 'User account created successfully',
                },
            }
        } catch (error) {
            return {
                statusCode: 500,
                data: {
                    message: 'Failed to update the user',
                    error: error
                },
            }
        }
    }

    async getUsers(params) {
        let { userId, email } = params;

        try {
            const users = await User.query().where((builder) => {
                if (userId) {
                    builder.where('id', userId);
                }

                if (email) {
                    builder.where('email', email);
                }

            }).orderBy('id', 'desc');

            if (!users.length) {
                return {
                    statusCode: 404,
                    data: {
                        message: 'Users not found',
                        users: users
                    },
                }
            }
            return {
                statusCode: 200,
                data: {
                    message: 'Fetched users successfully',
                    users: users.map((_user) => _user.serialize())
                },
            }
        } catch (error) {
            return {
                statusCode: 500,
                data: {
                    message: 'An error occurred, could not fetch user',
                    error: error
                },
            }
        }
    }
    async getUser(params) {
        let { id } = params;

        try {
            const user = await User.query().where((builder) => {
                builder.where('id', id);

            });

            if (id && user.length === 0) {
                return {
                    statusCode: 404,
                    data: {
                        message: 'User not found',
                    },
                }
            }

            return {
                statusCode: 200,
                data: {
                    message: 'Fetched user successfully',
                    user: user.map((_user) => _user.serialize())[0]
                },
            }
        } catch (error) {
            return {
                statusCode: 500,
                data: {
                    message: 'An error occurred, could not fetch user',
                    error: error
                },
            }
        }
    }



    async updateUser(userId,data) {
        try {
            let { name, password, user_role } = data;

            const user = await User.findOrFail(userId)

            let hashedPassword = await Hash.make(password);

            await user
                .merge({
                    name,
                    password: hashedPassword,
                    user_role,
                })
                .save()

            //store otp
            // probably use a cache - firebase ?
            return {
                statusCode: 200,
                data: {
                    message: 'User account updated successfully',
                },
            }
        } catch (error) {
            return {
                statusCode: 500,
                data: {
                    message: 'Failed to update the user',
                    error: error
                },
            }
        }
    }
}