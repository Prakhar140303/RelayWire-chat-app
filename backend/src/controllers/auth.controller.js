import { generateToken } from '../lib/utils.js';
import User from '../models/user.model.js'
import bcrypt from 'bcryptjs'
import cloudinary from '../lib/cloudinary.js'
export const signup =async (req, res) => {
    const {fullName, email, password} = req.body;
    console.log(fullName, email, password);
    try{
        if(!fullName || !email || !password){
            res.status(403).json({
                message : 'Please enter all the required fields'
            });
        }
        if(password.length<6){
            return res.status(400).json({message: 'Password should be at least 6 characters long'})
        }
        const user  = await User.findOne({email});
        if(user) return res.status(400).json({
            message: 'User already exists'
        });
        // hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            fullName : fullName,
            email : email,
            password : hashedPassword
        });
        if(newUser){
            generateToken(newUser._id,res);
            await newUser.save();
            res.status(201).json({
                message: "User registered successfully",
                _id : newUser._id,
                fullName: newUser.fullName,
                email: newUser.email,
                profilePic : newUser.profilePic,
                createAt : newUser.createAt,
                updateAt : newUser.updateAt
            });
        }else{
            res.status(400).json({
                message: "Invalid user data"
            })
        }
    }catch(error){
        console.log("Error in signup controller",error.message);
        res.status(500).json({message: 'Internal Server error'})
    }
};

export const login =async (req, res) => {
    const {email,password} = req.body;
    try{
        const user = await User.findOne({email});
        if(!user) return res.status(404).json({message: 'Invalid Credentials'});

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if(isPasswordCorrect) {
            generateToken(user._id,res);
            res.status(200).json({
                _id : user._id,
                fullName: user.fullName,
                email: user.email,
                profilePic : user.profilePic,
            })
        }else{
            res.status(401).json({message: 'Invalid Credentials'})
        }
    }catch(error){
        console.log("Error in login controller", error.message);
        res.status(500).json({message: 'Internal Server error'})
    }
}

export const logout = (req, res) => {
    try{
        if (!req.cookies.jwt) {
            return res.status(400).json({ message: "No active session found" });
        }
        res.cookie("jwt","",{maxAge: 0});
        res.status(200).json({
            message: "Logged out successfully"
        })
    }catch(error){
        console.log("Error in logout controller", error.message);
        res.status(500).json({message: 'Internal Server error'})
    }
}

export const updateProfile = async(req, res) => {
    try{
        const {profilePic} = req.body;
        const userId = req.user._id;
        if(!profilePic){
            res.status(400).json({message: 'Please provide profile picture'})
        }
        const uploadResponse =  await cloudinary.uploader.upload(profilePic);
        const updatedUser = await User.findByIdAndUpdate(userId,{profilePic: uploadResponse.secure_url},{new:true});
        res.status(200).json({
            updatedUser
        })
    }catch(error){
        console.log("Error in updateProfile controller", error.message);
        res.status(500).json({message: 'Internal Server error'})
    }
}

export const checkAuth = async(req, res) => {
    try{
        res.status(200).json(req.user)
    }catch(error){   
        console.log("Error in checkAuth controller", error.message);
        res.status(500).json({message: 'Internal Server error'})
    }
}

