import UserRepository from "../repository/userRepository.js";

class UserService {
    constructor(){
        this.userRepository = new UserRepository;
    }

    async signUp(data){
        try {
            const user =await this.userRepository.create(data);
            return user;
        } catch (error) {
            console.log("user service",error);
            throw error;
        }
    }

    async getUserByEmail(email){
        try {
            const response = await this.userRepository.findBy({email});
            return response;
        } catch (error) {
            console.log("Something went wrong in service layer");
            throw error
        }
    }
}

export default UserService