import axios from "axios";

const baseUrl = import.meta.env.VITE_BASE_URL

const authService = axios.create({
    baseURL: baseUrl
})

export const Login = async (values) =>{
    try{
        const response = await authService.post('/login', values)
        console.log(response);
    }catch(error){
        throw error
    }
}