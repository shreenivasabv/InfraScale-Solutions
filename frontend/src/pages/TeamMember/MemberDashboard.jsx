import { useEffect, useState } from "react";
import axios from "axios";
import "./MemberDashboard.css";

const API = "http://localhost:5000/api/member-profile";
const TEAM_API = "http://localhost:5000/api/team";

function MemberDashboard() {

  const [member, setMember] = useState(null);
  const [teamInfo, setTeamInfo] = useState(null);
  const [activeTab, setActiveTab] = useState("general");
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  // 🔹 FETCH MEMBER PROFILE (skills, projects, etc)
  const fetchProfile = async () => {
    try {
      const res = await axios.get(`${API}/me`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setMember({
        ...res.data,
        skills: res.data.skills || [],
        projects: res.data.projects || [],
        workExperience: res.data.workExperience || []
      });

    } catch (error) {
      console.error(
        "Failed to fetch profile:",
        error.response?.data || error.message
      );
    }
  };

  // 🔹 FETCH TEAM INFO (name, image, designation)
  const fetchTeamProfile = async () => {
    try {
      const res = await axios.get(`${TEAM_API}/me`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setTeamInfo(res.data);

    } catch (error) {
      console.error(
        "Failed to fetch team info:",
        error.response?.data || error.message
      );
    }
  };

  // 🔹 INITIAL LOAD
  useEffect(() => {
    const loadData = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      await Promise.all([
        fetchProfile(),
        fetchTeamProfile()
      ]);

      setLoading(false);
    };

    loadData();
  }, [token]);

  // 🔹 UPDATE MEMBER PROFILE
  const handleUpdate = async () => {
    try {
      await axios.put(`${API}/me`, member, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      alert("Profile Updated Successfully 🚀");

    } catch (error) {
      console.error(
        "Update error:",
        error.response?.data || error.message
      );
      alert("Update failed");
    }
  };

  if (loading) return <p>Loading profile...</p>;
  if (!member) return <p>Profile not found</p>;


  return (
    <div className="dashboard-wrapper">

      {/* HEADER */}
      <div className="profile-header">
        <div className="profile-left">
          <img
            src={member.image || "/default.png"}
            alt="profile"
            className="profile-image"
          />

          <div>
            <h2>{member.name || "Your Name"}</h2>
            <p>{member.designation}</p>
            <span>{member.department}</span>
          </div>
        </div>

        <button className="save-btn" onClick={handleUpdate}>
          Save Changes
        </button>
      </div>

      {/* TABS */}
      <div className="tabs">
        {["general", "skills", "projects", "experience"].map(tab => (
          <button
            key={tab}
            className={activeTab === tab ? "active" : ""}
            onClick={() => setActiveTab(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      <div className="content-card">

        {/* GENERAL */}
        {activeTab === "general" && (
          <div className="grid-2">
            <input
              placeholder="Full Name"
              value={member.name || ""}
              onChange={(e) =>
                setMember({ ...member, name: e.target.value })
              }
            />

            <input
              placeholder="Designation"
              value={member.designation || ""}
              onChange={(e) =>
                setMember({ ...member, designation: e.target.value })
              }
            />

            <input
              placeholder="Department"
              value={member.department || ""}
              onChange={(e) =>
                setMember({ ...member, department: e.target.value })
              }
            />

            <input
              placeholder="Specialization"
              value={member.specialization || ""}
              onChange={(e) =>
                setMember({ ...member, specialization: e.target.value })
              }
            />

            <input
              type="number"
              placeholder="Experience Years"
              value={member.experienceYears || 0}
              onChange={(e) =>
                setMember({ ...member, experienceYears: e.target.value })
              }
            />
          </div>
        )}

        {/* SKILLS */}
        {activeTab === "skills" && (
          <textarea
            rows="4"
            placeholder="Comma separated skills"
            value={member.skills.join(", ")}
            onChange={(e) =>
              setMember({
                ...member,
                skills: e.target.value.split(",").map(s => s.trim())
              })
            }
          />
        )}

        {/* PROJECTS */}
        {activeTab === "projects" && (
          <div className="dynamic-section">
            {member.projects.map((proj, index) => (
              <div key={index} className="dynamic-card">
                <input
                  placeholder="Project Title"
                  value={proj.title || ""}
                  onChange={(e) => {
                    const updated = [...member.projects];
                    updated[index].title = e.target.value;
                    setMember({ ...member, projects: updated });
                  }}
                />

                <input
                  placeholder="Technologies"
                  value={proj.technologies?.join(", ") || ""}
                  onChange={(e) => {
                    const updated = [...member.projects];
                    updated[index].technologies =
                      e.target.value.split(",").map(t => t.trim());
                    setMember({ ...member, projects: updated });
                  }}
                />
              </div>
            ))}

            <button
              onClick={() =>
                setMember({
                  ...member,
                  projects: [
                    ...member.projects,
                    { title: "", technologies: [] }
                  ]
                })
              }
            >
              + Add Project
            </button>
          </div>
        )}

        {/* EXPERIENCE */}
        {activeTab === "experience" && (
          <div className="dynamic-section">
            {member.workExperience.map((exp, index) => (
              <div key={index} className="dynamic-card">
                <input
                  placeholder="Company"
                  value={exp.company || ""}
                  onChange={(e) => {
                    const updated = [...member.workExperience];
                    updated[index].company = e.target.value;
                    setMember({ ...member, workExperience: updated });
                  }}
                />

                <input
                  placeholder="Designation"
                  value={exp.designation || ""}
                  onChange={(e) => {
                    const updated = [...member.workExperience];
                    updated[index].designation = e.target.value;
                    setMember({ ...member, workExperience: updated });
                  }}
                />

                <input
                  placeholder="Duration"
                  value={exp.duration || ""}
                  onChange={(e) => {
                    const updated = [...member.workExperience];
                    updated[index].duration = e.target.value;
                    setMember({ ...member, workExperience: updated });
                  }}
                />
              </div>
            ))}

            <button
              onClick={() =>
                setMember({
                  ...member,
                  workExperience: [
                    ...member.workExperience,
                    { company: "", designation: "", duration: "" }
                  ]
                })
              }
            >
              + Add Experience
            </button>
          </div>
        )}

      </div>
    </div>
  );
}

export default MemberDashboard;
