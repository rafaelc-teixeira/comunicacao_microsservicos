import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import UserRepository from "../repository/UserRepository.js"
import UserException from "../exception/UserException.js";
import * as httpStatus from "../../../config/constants/httpStatus.js";
import * as secrets from "../../../config/constants/secrets.js";

class UserService {

    async findByEmail(req) {
        try {
            const { email } = req.params;
            this.validateRequestData(email);
            let user = await UserRepository.findByEmail(email);
            this.validadeUserNotFound(user);
            return {
                status: httpStatus.SUCCESS,
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                },
            };
        } catch (err) {
            return {
                status: err.status ? err.status : httpStatus.INTERNAL_SERVER_ERROR,
                message: err.message,
            }    
        }
    }
    
    validateRequestData(email) {
        if(!email) {
            throw new UserException(
                httpStatus.BAD_REQUEST,
                "User email was not informed"
            );
        }
    }

    validadeUserNotFound(user) {
        if(!user) {
            throw new UserException(
                httpStatus.BAD_REQUEST,
                "User was not found"
            );
        }
    }

    async getAccessToken(req) {
        try {
            const { email, password } = req.body;
            this.validadeAccessToken(email, password);
            let user = await UserRepository.findByEmail(email);
            this.validadeUserNotFound(user);
            await this.validatePassword(password, user.password);
            const authUser = {
                id: user.id,
                name: user.name,
                email: user.email
            };
            const accessToken = jwt.sign({authUser}, secrets.API_SECRET, {expiresIn: "1d"});
            return {
                status: httpStatus.SUCCESS,
                accessToken,
            };
        } catch (err) {
            return {
                status: err.status ? err.status : httpStatus.INTERNAL_SERVER_ERROR,
                message: err.message,
            } 
        }

    }

    validadeAccessToken(email, password) {
        if (!email || !password) {
            throw new UserException(
                httpStatus.UNAUTHORIZED,
                "Email and Password must be informed."
            );
        }
    }

    async validatePassword(password, hashPassword) {
        if (!await bcrypt.compare(password, hashPassword)) {
            throw new UserException(httpStatus.UNAUTHORIZED, "Password doesn't match.");
        }
    }


}

export default new UserService();