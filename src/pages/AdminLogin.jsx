// import { useState } from "react";
// import { loginUser } from "../api/userApi";
// import { adminLogin } from "../api/adminApi";
// import { useNavigate } from "react-router-dom";

// export default function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const ADMIN_EMAIL = "zwelishat@gmail.com"; // Admin email

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setError("");

//     try {
//       let data;

//       if (email === ADMIN_EMAIL) {
//         // Admin login
//         data = await adminLogin(email, password);
//         localStorage.setItem("token", data.token);
//         localStorage.setItem("role", "admin");
//         navigate("/admin/dashboard"); // redirect admin
//       } else {
//         // Regular user login
//         data = await loginUser({ email, password });
//         localStorage.setItem("token", data.token);
//         localStorage.setItem("role", "user");
//         navigate("/"); // redirect user to homepage with cars
//       }
//     } catch (err) {
//       setError(err.response?.data?.message || "Login failed");
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-900 to-indigo-900 px-4">
//       <div className="bg-white/10 backdrop-blur-md rounded-3xl shadow-2xl p-10 w-full max-w-md text-white">
//         <h2 className="text-4xl font-bold mb-6 text-center">Login</h2>
//         <form className="flex flex-col gap-5" onSubmit={handleLogin}>
//           <input
//             type="email"
//             placeholder="Email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             className="p-3 rounded-lg bg-white/20 border border-white/30 focus:outline-none focus:ring-2 focus:ring-yellow-400"
//             required
//           />
//           <input
//             type="password"
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             className="p-3 rounded-lg bg-white/20 border border-white/30 focus:outline-none focus:ring-2 focus:ring-yellow-400"
//             required
//           />
//           {error && <p className="text-red-400 text-sm">{error}</p>}
//           <button
//             type="submit"
//             className="py-3 rounded-full bg-yellow-400 font-bold text-gray-900 hover:scale-105 transform transition duration-300 shadow-lg"
//           >
//             Login
//           </button>
//         </form>
//         <p className="mt-4 text-center text-gray-300">
//           Don’t have an account?{" "}
//           <a href="/register" className="text-yellow-400 hover:underline">
//             Register
//           </a>
//         </p>
//       </div>
//     </div>
//   );
// }



// src/components/AdminLogin.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function AdminLogin() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // TODO: Replace with your actual backend API call
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        // Store token (you might use httpOnly cookies instead)
        localStorage.setItem('adminToken', data.token);
        navigate('/admin/dashboard');
      } else {
        setError('Invalid credentials');
      }
    } catch (err) {
      setError('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Admin Login</h2>
          <p className="mt-2 text-gray-600">Access the vehicle management panel</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-red-800 text-sm">{error}</p>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="admin@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              required
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
          >
            {loading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>
      </div>
    </div>
  );
}