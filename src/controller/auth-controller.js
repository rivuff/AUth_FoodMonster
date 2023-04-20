
import UserService from "../service/userService.js";

const userService = new UserService();

export const signUp = async (req,res)=>{
    try {
    
        const response =await userService.signUp({
            email: req.body.email,
            password: req.body.password,
            name: req.body.name,
            address: req.body.address
        });
        return res.status(200).json({
            success: true,
            message:'Successfully created new user',
            data: response,
            err: {}
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "something went wrong in controller",
            data: {},
            err: error
        })
    }
}

export const signIn = async (req, res)=>{{
    try {
        const user = await userService.getUserByEmail(req.body.email);
        if(!user){
            return res.status(401).json({
                success: false,
                message: "User not found"
            })
        }
        else if(!user.comparePassword(req.body.password)){
            return res.status(401).json({
                success: false,
                message: "incorrect password"
            })
        }

        const token = user.genJWT();

        return res.status(200).json({
            success: true,
            message: "Successfully logged in",
            data: token,
            err: {}
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Something went wrong in auth layer',
            data: {},
            success: false,
            err: error
        })
    }
}}