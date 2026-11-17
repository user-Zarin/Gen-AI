import react from 'react'
import { useAuth } from "../hooks/useAuth";
import {useNavigate} from "react-router-dom";
const Register = () => {
    const { loading,handleRegister } = useAuth();
    const [username, setUsername] = react.useState("");
    const [email, setEmail] = react.useState("");
    const [password, setPassword] = react.useState("");
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        handleRegister(username, email, password);
        navigate("/"); // Redirect to the home page after successful registration
    }   
    if (loading) {
        return <div>Loading...</div>;
    }
    return (
        <main>
            <div className="form-container">
                <h1>Register</h1>
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="userName">User Name</label>
                        <input type="text" id="userName" name="userName" placeholder="User Name" required onChange={(e) => setUsername(e.target.value)} />
                    </div>
                    <div className="input-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" name="email" placeholder="Email" required onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" name="password" placeholder="Password" required onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <button type="submit" className="button primary-button">Register</button>
                </form>
                <p>Already have an account? <a href="/login">Login</a></p>
            </div>
        </main>
    )

}

export default Register