import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Clear any existing user session data first
        localStorage.removeItem("user");
        localStorage.removeItem("email");
        
        // Store new user data with user ID for better reliability
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem('email', email.toLowerCase().trim()); // Normalize email
        localStorage.setItem('userId', data.user.id || email.toLowerCase().trim()); // Backup identifier
        
        toast.success("Login successful!");
        navigate("/calculator");
      } else {
        toast.error(data.message || "Login failed");
      }
    } catch (err) {
      console.error("Login failed", err);
      toast.error("Something went wrong.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-tr from-green-200 to-white">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full px-4 py-2 border rounded-lg mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full px-4 py-2 border rounded-lg mb-6"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition"
        >
          Login
        </button>
      </form>
    </div>
  );
}
