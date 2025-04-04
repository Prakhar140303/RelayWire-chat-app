import User from '../models/user.model.js'
import Message from '../models/message.model.js'
import cloudinary from '../lib/cloudinary.js';
export const getUserForSidebar = async (req,res)=>{
    try{
        const loggedInUserId = req.user._id;
        const filteredUser = await User.findById({
            _id: {$ne : loggedInUserId}
        }).select("-password");
        response.status(200).json(filteredUser);
    }catch(err){
        console.log("Error in getUserForSidebar",error.message);
        res.status(200).json({
            error : "Internal Server Error"
        })
    }
}
export const getMessages = async (req,res) =>{
    try{
        const {id: usertoChatId} = req.params;
        const myId  =req.user._id;
        const message = await Message.find({
            $or: [
                {senderId: myId,reciverId :usertoChatId},
                {senderId: usertoChatId,reciverId:myId}
            ]
        });
        res.status(200).json(message);
    }catch(error){
        console.log("Error in getMessage",error.message);
        res.status(200).json({
            error : "Internal Server Error"
        })
    }
}

export const sendMessage = async (req,res) =>{
    try{
        const{text, image} = req.body;
        const {id: receiverId} = req.params;
        const senderId = req.user._id;

        let imageUrl;
        if(image){
            const uploadResponse = await cloudinary.uploader.upload(image);
            imageUrl = uploadResponse.secure_url;
        }
        const newMessage = new Message({
            senderId,
            receiverId,
            text,
            imageUrl
        });
        await newMessage.save();
        // todo : realtime functinonality goes here => socket.io
        res.status(200).json(newMessage);
    }catch(error){
        console.log("Error in sendingMessage controller",error.message);
        res.status(200).json({
            error : "Internal Server Error"
        })
        
    }
}