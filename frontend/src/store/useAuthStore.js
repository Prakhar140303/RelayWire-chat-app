import {create} from 'zustand'
import { axiosInstance } from '../lib/axios.js';
import toast from 'react-hot-toast'
export const userAuthStore  = create((set)=>({
    authUser: null,
    isSigningUp: false,
    isLogginIn: false,
    isUpdatingProfile:false,
    isCheckingAuth: true,
    onlineUsers : [],
    checkAuth :async ()=>{
        try{
            const res = await axiosInstance.get("/auth/check");
            set({authUser: res.data});
        }catch(error){
            console.log("Error in CheckAuth",error);
            set({authUser:null});
        }finally{
            set({isCheckingAuth : false});
        }
    },

    signup : async (data) =>{
        set({ isSigningUp: true});
        try{
            const res = await axiosInstance.post("/auth/signup",data);
            set({authUser: res.data})
            toast.success("Account created successfully");

        }catch(error){
            toast.error(error.response.data.message);
        }finally{
            set({isSigningUp: false});
        }
    },

    login : async(data) =>{
        set({isLogginIn : true});
        try{
            const res = await axiosInstance.post('/auth/login',data);
            set({authUser: res.data});
            toast.success("Logged in successfully");
        }catch(error){
            toast.error(error.response.data.message);
        }finally{
            set({isLogginIn : false});
        }
    },

    logout : async (data) =>{
        try{
            console.log("In the logout",{data});
            await axiosInstance.post("/auth/logout");
            set({authUser: null});
            toast.success("Account logged out successfully");
        }catch(error){
        toast.error(error.response.data.message);    
        };
    },

    updateProfile : async (data) =>{
        set({isUpdatingProfile: true});
        try{
            const res = await axiosInstance.put("/auth/update-profile",data);
            set({authUser : res.data});
            toast.success("Profile updated successfully");

        }catch(error){
            toast.error(error.response.data.message);
        }finally{
            set({isUpdatingProfile: false});
        }
    }

}));