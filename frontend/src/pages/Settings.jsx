import { Link } from "react-router-dom";
import {
  FaArrowLeft,
  FaBell,
  FaLock,
  FaMoon,
  FaInfoCircle
} from "react-icons/fa";

import "./Settings.css";

function Settings() {
  return (
    <div className="settings-page">

      <div className="settings-card">

        <Link to="/dashboard" className="back-btn">
          <FaArrowLeft />
          Back to Dashboard
        </Link>

        <h1>Settings</h1>

        <div className="setting-box">

          <FaMoon className="setting-icon"/>

          <div>

            <h3>Appearance</h3>

            <p>Dark Mode (Coming Soon)</p>

          </div>

        </div>

        <div className="setting-box">

          <FaBell className="setting-icon"/>

          <div>

            <h3>Notifications</h3>

            <p>Email Notifications Enabled</p>

          </div>

        </div>

        <div className="setting-box">

          <FaLock className="setting-icon"/>

          <div>

            <h3>Security</h3>

            <p>Change Password (Coming Soon)</p>

          </div>

        </div>

        <div className="setting-box">

          <FaInfoCircle className="setting-icon"/>

          <div>

            <h3>About TaskFlow</h3>

            <p>MERN Stack Task Management System v1.0</p>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Settings;