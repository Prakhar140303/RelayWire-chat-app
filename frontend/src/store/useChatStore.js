import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";
import {userAuthStore} from './useAuthStore'
// import { Trophy } from "lucide-react";

export const useChatStore = create((set,get) => ({
    messages : [],
    users : [],
    isUsersLoading : false,
    selectedUser : null,
    isMessagesLoading : false,
    getUsers: async ()=>{
        set({isUsersLoading : true});
        try{
            const res= await axiosInstance.get("/messages/users");
            set({users: res.data});
        }catch(error){
            toast.error(error.response.data.message);
        }finally{
            set({isUsersLoading : false});
        }
    },
    getMessages: async (userId)=>{
        set({isMessagesLoading : true});
        try{
            const res= await axiosInstance.get(`/messages/${userId}`);
            console.log("getMessages : ",res.data);
            set({messages: res.data});
        }catch(error){
            toast.error(error.response.data.message);
        }finally{
            set({isMessagesLoading : false});
        }
    },
    sendMessage: async (messageData)=>{
        const {selectedUser,messages} = get();
        try{
            const res = await axiosInstance.post(`/messages/send/${selectedUser._id}`,messageData);
            set({messages:[...messages ,res.data]});
        }catch(error){
            toast.error(error.response.data.message);
        }   
    },
    subscribeToMessages: ()=>{
        const {selectedUser} = get();
        
        if(!selectedUser){
            console.log("user not selected");       
             return;
            }
        const socket = userAuthStore.getState().socket;
        socket.on("newMessage",(newMessage)=>{
            
            if(newMessage.senderId!==selectedUser._id)return;

            set({messages: [...get().messages,newMessage]});
        })
    },
    unsubscribeToMessage: ()=>{
        const socket = userAuthStore.getState().socket;
        socket.off("newMessage");

    },
    setSelectedUser : async(selectedUser)=>set({selectedUser}),
}))