"use client";
import { useState } from "react";
import { supabase } from "../lib/supabaseClient";

interface LoginProps {
  onLoginSuccess: (userEmail: string) => void;
}

const Login: React.FC<LoginProps> = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    setLoading(false);

    if (error) {
      alert(error.message);
      return;
    }

    if (data.user) {
      onLoginSuccess(data.user.email!);
      setEmail("");
      setPassword("");
    }
  };

  const handleSignup = async () => {
    setLoading(true);
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });
    setLoading(false);

    if (error) {
      alert(error.message);
      return;
    }

    if (data.user) {
      onLoginSuccess(data.user.email!);
      setEmail("");
      setPassword("");
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10, maxWidth: 300 }}>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin} disabled={loading}>
        {loading ? "Logging in..." : "Login"}
      </button>
      <button onClick={handleSignup} disabled={loading}>
        {loading ? "Signing up..." : "Sign Up"}
      </button>
    </div>
  );
};

export default Login;
