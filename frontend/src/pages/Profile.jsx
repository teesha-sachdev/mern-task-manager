import { FaUser, FaEnvelope, FaEdit, FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./Profile.css";

function Profile() {
  const user = JSON.parse(localStorage.getItem("user")) || {};

  return (
    <div className="profile-page">

      <div className="profile-card">

        <Link to="/dashboard" className="back-btn">
          <FaArrowLeft /> Back to Dashboard
        </Link>

        <div className="avatar">
          {user?.name?.charAt(0).toUpperCase() || "U"}
        </div>

        <h2>{user?.name || "User"}</h2>

        <p className="email">{user?.email || "No Email"}</p>

        <div className="profile-info">

          <div className="info-box">
            <FaUser className="info-icon" />
            <div>
              <span>Full Name</span>
              <h3>{user?.name || "User"}</h3>
            </div>
          </div>

          <div className="info-box">
            <FaEnvelope className="info-icon" />
            <div>
              <span>Email Address</span>
              <h3>{user?.email || "No Email"}</h3>
            </div>
          </div>

        </div>

        <button className="edit-btn">
          <FaEdit />
          Edit Profile
        </button>

      </div>

    </div>
  );
}

export default Profile;