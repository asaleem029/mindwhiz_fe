import React, { useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@/contexts/AuthContext";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();
    const { login } = useAuth();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        
        const success = await login(email, password);
        if (success) {
            router.push("/");
        } else {
            setError("Invalid credentials. Try admin@mindwhiz.com/admin or customer@mindwhiz.com/customer");
        }
    };

    return (
        <div className="login-container">
            <div className="login-form">
                <h1 className="login-title">Login</h1>
                <form onSubmit={handleLogin}>
                    <div className="form-group">
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email"
                            required
                            className="form-input"
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                            required
                            className="form-input"
                        />
                    </div>
                    {error && <div className="error-message">{error}</div>}
                    <button type="submit" className="btn-primary">Login</button>
                </form>
                <div className="login-hint">
                    <p>Demo credentials:</p>
                    <p>Admin: admin@mindwhiz.com / admin</p>
                    <p>Customer: customer@mindwhiz.com / customer</p>
                </div>
            </div>
        </div>
    );
};

export default Login;
