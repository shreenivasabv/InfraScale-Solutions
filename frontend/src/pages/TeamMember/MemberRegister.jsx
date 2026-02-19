import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./MemberAuth.css";

function MemberRegister() {
  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5000/api/member-auth/register",
        form
      );

      alert(res.data.message);
      navigate("/member-login");

    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Activate Your Account</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Registered Email"
            value={form.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Create Password"
            value={form.password}
            onChange={handleChange}
            required
          />

          <button type="submit">Set Password</button>
        </form>

        <p>
          Already activated?{" "}
          <span onClick={() => navigate("/member-login")}>
            Login
          </span>
        </p>
      </div>
    </div>
  );
}

export default MemberRegister;
