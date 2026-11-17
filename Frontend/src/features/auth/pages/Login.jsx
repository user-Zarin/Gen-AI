import react from 'react'
import "./auth.form.scss"
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
const Login = () => {
    const { loading, handleLogin } = useAuth();
    const [email, setEmail] = react.useState("");
    const [password, setPassword] = react.useState("");
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        handleLogin(email, password);
        navigate("/"); // Redirect to the home page after successful login
    }
    if (loading) {
        return <div>Loading...</div>;
    }
    return (
        <main>
            <div className="form-container">
                <h1>Login</h1>
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" name="email" onChange={(e)=>setEmail(e.target.value)} placeholder="Email" required />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" onChange={(e)=>setPassword(e.target.value)} placeholder="Password" required />
                    </div>
                    <button type="submit" className="button primary-button">Login</button>
                </form>
                <p>Don't have an account? <a href="/register">Register</a></p>
            </div>
        </main>
    )
}

export default Login