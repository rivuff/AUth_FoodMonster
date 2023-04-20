import { response } from "express";
import User from "../models/user.js";

class UserRepository {

    async create(data){
        try {
            console.log(data);
            const reponse  = await User.create(data);
            console.log(response);
            return reponse
        } catch (error) {
            console.log("user repo ",error);
            throw error;
        }
    }

    async findBy(data){
        try {
            const response  = await User.findOne(data);
            return response;
        } catch (error) {
            console.log("Something went wrong in repository layer");
            throw error
        }
    }
}

export default UserRepository