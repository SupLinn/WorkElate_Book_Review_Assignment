import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userId, setUserId] = useState(localStorage.getItem('userId') || "");


  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`http://localhost:3001/api/auth/register`, {
        username,
        email,
        password,
      });

      const { userId, token } = res.data;

      // Save in localStorage
      localStorage.setItem('userId', userId);
      localStorage.setItem('token', token);

      navigate('/'); // Redirect to home after signup
    } catch (error) {
      alert(error.response?.data?.message || 'Signup failed. Try again.');
    }
  };
  useEffect(() => {
      userId && navigate('/');
    }, [userId]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSignup} className="bg-white p-8 rounded shadow-md w-80 flex flex-col gap-4">
        <h2 className="text-2xl font-bold text-center">Sign Up</h2>
        <input
          type="text"
          placeholder="Username"
          className="border p-2 rounded"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
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
        <button type="submit" className="bg-green-500 hover:bg-green-600 text-white py-2 rounded">
          Sign Up
        </button>
        <p className="text-sm text-center mt-2">
          Already have an account? <a href="/login" className="text-blue-500 underline">Login</a>
        </p>
      </form>
    </div>
  );
};

export default Signup;
