import { useEffect, useState } from "react";
import axios from "axios";
import "./Team.css";
import MemberAccessButton from "../MemberAccessButton/MemberAccessButton";

function Team() {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/team")
      .then(res => setMembers(res.data))
      .catch(err => console.error("Error fetching team:", err));
  }, []);

  return (
    <div className="team-page">
      <h1>Our Team</h1>

      <div className="team-grid">
        {members.map(member => (
          <div className="team-card" key={member._id}>
            <img 
              src={`http://localhost:5000/uploads/${member.image}`} 
              alt={member.name}
              onError={(e) => console.error("Image failed to load:", e.target.src)}
            />

            <h3>{member.name}</h3>
            <p className="designation">{member.designation}</p>
            <p><strong>Specialization:</strong> {member.specialization}</p>
            <p><strong>Experience:</strong> {member.experience} Years</p>

            <ul>
              {(Array.isArray(member.features) 
                ? member.features 
                : JSON.parse(member.features || "[]")
              ).map((f, i) => (
                <li key={i}>{f}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* 🔥 Floating Login/Register Button */}
      <MemberAccessButton />
    </div>
  );
}

export default Team;
