import { useState } from "react";
import api from "../../services/api";

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const res = await api.post(
      "/auth/login",
      { email, password }
    );

    localStorage.setItem("token", res.data.token);
    onLogin(); 
  };

  return (
    <div>
      <div className="h-screen flex items-center justify-center bg-gray-100">
  <div className="bg-white p-8 rounded-xl shadow-xl w-80">

      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button onClick={handleLogin}>Login</button>
    </div>
    </div></div>
  );
}


export default Login;