const authRepository = require("../repositories/authRepository");
const { decryptPassword } = require("../utils/hashPassword");
const jwt = require("jsonwebtoken");
const ms = require("ms");
const { JWT } = require("../libs/jwtSecurity");


class AuthService {

    /* ------------------- Handle Admin Login ------------------- */

    static async handleAdminLogin({ username, password, id_admin, expired_at }){

        try {
            
            // ------------------------- Payload Validation ------------------------- //

            if (!username) {
                return {
                    status: false,
                    status_code: 400,
                    message: "Username is required!",
                    data: {
                        login: null,
                    },
                };
            }

            if (!password) {
                return {
                    status: false,
                    status_code: 400,
                    message: "Password is required!",
                    data: {
                        login: null,
                    },
                };
            }

            // ------------------------- End Payload Validation ------------------------- //


            const getDataByUsername = await authRepository.handleGetDataByUsername({ username });

            if (!getDataByUsername) {
                return {
                    status: false,
                    status_code: 404,
                    message: "Username not registered",
                    data: {
                        login: null,
                    },
                };
            } else {

                const decryptedPassword = decryptPassword(getDataByUsername.password);

                if (password === decryptedPassword) {

                    const token = jwt.sign({
                        username: getDataByUsername.username,
                        password: getDataByUsername.password
                    },
                        JWT.SECRET,
                        {
                            expiresIn: JWT.EXPIRED,
                        });

                    const existingToken = await authRepository.getTokenByAdminId({ id_admin: getDataByUsername.id });
                    const expiresAt = new Date(Date.now() + ms(JWT.EXPIRED));

                    if (!existingToken) {
                        await authRepository.handleCreateToken({
                            id_admin: getDataByUsername.id,
                            token,
                            expired_at: expiresAt
                        });
                    } else {
                        await authRepository.handleUpdateToken({
                            id_admin: getDataByUsername.id,
                            token,
                            expired_at: expiresAt
                        })
                    }

                    return {
                        status: true,
                        status_code: 201,
                        message: "Login successfully!",
                        data: {
                            token
                        },
                    };

                } else {

                    return {
                        status: false,
                        status_code: 400,
                        message: "Your email or password is incorrect!",
                        data: {
                            login: null,
                        },
                    };

                }
            }

        } catch (err) {

            return {
                status: false,
                status_code: 500,
                message: err.message,
                data: {
                    login: null,
                },
            };

        }

    };

    /* ------------------- End Handle Admin Login ------------------- */

};

module.exports = AuthService;