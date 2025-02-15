import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import validator from "validator";


//login user

const loginUser = async(req,res)=>{
    const {email,password} = req.body;

    try {
        const user = await userModel.findOne({email});

        if(!user){
            return res.json({success:false, message:"User does not exist"});
        }

        const isMatch = await bcryptjs.compare(password, user.password);
        
        if(!isMatch){
            return res.json({success:false, message:"Invalid credentials"});
        }

        const token =  createToken(user._id);
        res.json({success:true, token});

    } catch (error) {
        console.log(error);
        return res.json({success:false, message:"Error"});
    }
}


const createToken = (id) => {
    return jwt.sign({id},process.env.JWT_SECRET);
}

//register user

const registerUser = async(req,res)=>{
    const {name,email,password} = req.body;
    try {
        //checking if user already exists
        const exist = await userModel.findOne({email});
        if(exist){
            return res.json({success: false, message:"User Already Exists"});
        }

        //validating email format and strong password
        if(!validator.isEmail(email)){
            return res.json({success: false, message:"Please enter valid email"});
        }

        if(password.length<8){
            return res.json({success: false, message:"Please enter a strong password"});
        }

        //hashing user password
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);


        const newUser = new userModel({
            name:name,
            email:email,
            password:hashedPassword
        })

        const user = await newUser.save()
        const token = createToken(user._id)
        res.json({success: true, token})

    } catch (error) {
        console.log(error);
        res.json({success: false,message:"THIS IS ERROR"})
    }
}

export {loginUser, registerUser};