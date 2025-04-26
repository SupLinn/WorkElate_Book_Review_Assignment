import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userId, setUserId] = useState(localStorage.getItem('userId') || "");
  
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`http://localhost:3001/api/auth/login`, {
        email,
        password,
      });

      const { userId, token } = res.data; 
      localStorage.setItem('userId', userId);
      localStorage.setItem('token', token);

      navigate('/'); // redirect to home after login
    } catch (error) {
      alert('Login failed. Please check your credentials.');
    }
  };
  useEffect(() => {
    userId && navigate('/');
  }, [userId]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleLogin} className="bg-white p-8 rounded shadow-md w-80 flex flex-col gap-4">
        <h2 className="text-2xl font-bold text-center">Login</h2>
        <input
          type="email"
          placeholder="Email"
          className="border p-2 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="border p-2 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white py-2 rounded">
          Login
        </button>
        <p className="text-sm text-center mt-2">
          Don't have an account? <a href="/signup" className="text-blue-500 underline">Sign up</a>
        </p>
      </form>
    </div>
  );
};

export default Login;
