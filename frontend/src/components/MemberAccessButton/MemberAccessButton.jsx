import { useState } from "react";
import { FaUserShield } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./MemberAccessButton.css";

function MemberAccessButton() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <div className="member-floating" onClick={() => setOpen(true)}>
        <FaUserShield />
      </div>

      {open && (
        <div className="member-modal">
          <div className="member-modal-content">
            <h3>Member Access</h3>

            <button onClick={() => navigate("/member-login")}>
              Login
            </button>

            <button onClick={() => navigate("/member-register")}>
              Register
            </button>

            <button className="close-btn" onClick={() => setOpen(false)}>
              Close
            </button>

          </div>
        </div>
      )}
    </>
  );
}

export default MemberAccessButton;
