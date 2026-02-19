import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./MemberAuth.css"; // Using the same CSS as registration

function MemberLogin() {
  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ... (imports remain the same)

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5000/api/member-auth/login",
        form
      );

      // 1. Store the token
      localStorage.setItem("token", res.data.token);
      
      // 2. Optional: Store user info if your backend sends it
      if(res.data.memberId) {
        localStorage.setItem("memberId", res.data.memberId);
      }

      alert("Login Successful!");
      
      // 3. Navigate to the dashboard URL
      navigate("/member-dashboard"); 
      
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

// ... (rest of the component)

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Member Login</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={form.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
          />

          <button type="submit">Login</button>
        </form>

        <p>
          Need to activate?{" "}
          <span className="auth-link" onClick={() => navigate("/member-register")}>
            Set Password
          </span>
        </p>
      </div>
    </div>
  );
}

export default MemberLogin;