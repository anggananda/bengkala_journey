import axios from "axios";

const baseUrl = import.meta.env.VITE_BASE_URL_LOGIN

const userService = axios.create({
    baseURL: baseUrl
})

export const login = async (values) =>{
    try{
        const response = await userService.post('/login', values)
        return response.data.token
    }catch(error){
        throw error
    }
}