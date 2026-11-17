import {AuthContext} from "../../../contexts/auth.context.jsx";
import {useContext, useEffect} from "react";
import {Login as login, register, Logout as logout, getMe} from "../services/auth.api.js";

export const useAuth = () => {
    const context = useContext(AuthContext);
    const {user, setUser, loading, setLoading} = context;
    const handleLogin = async (email, password) => {
        setLoading(true);
        try {
            const userData = await login(email, password);
            setUser(userData);
        } catch (error) {
            console.error("Login failed:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleRegister = async (username, email, password) => {
        setLoading(true);
        try {
            const userData = await register(username, email, password);
            setUser(userData);
            setLoading(false);
        } catch (error) {
            console.error("Register failed:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = async () => {
        setLoading(true);
        try {
            await logout();
            setUser(null);
            setLoading(false);
        } catch (error) {
            console.error("Logout failed:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(()=>{
        const getAndSetUser = async () => {
            const data = await getMe();
            setUser(data.user);
            setLoading(false);
        };

        getAndSetUser();
    }, []);

    return { user, loading, handleLogin, handleRegister, handleLogout };
};