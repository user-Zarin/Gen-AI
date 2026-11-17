import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3000/api/auth",
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
    }
});

export async function register(username, email, password) {
    try {
        const response = await api.post("/register", {
            username,
            email,
            password
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message || "Registration failed");
    } 
}

export async function Login(email, password) {
    try {
        
        const data = await api.post("/login", {
            email,
            password
        });
        return data;
    }catch(error){
        throw new Error(error.response.data.message || "Login failed");
    }
}

export async function getUserData() {
    try {
        const response = await api.get("/get-me");
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message || "Failed to fetch user data");
    }
}

export async function Logout() {
    try {
        const response = await api.post("/logout");
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message || "Logout failed");
    }
}