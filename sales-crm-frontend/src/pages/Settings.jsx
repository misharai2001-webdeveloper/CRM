import React, { useEffect, useState } from "react";
import { getAdminProfile, updateAdminProfile } from "../api/settingsApi";
import "./settings.css";

export default function Settings() {
  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    const data = await getAdminProfile();
    setProfile({
      firstName: data.firstName || "",
      lastName: data.lastName || "",
      email: data.email || "",
      password: "",
      confirmPassword: "",
    });
  };

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const saveProfile = async () => {
    if (profile.password !== profile.confirmPassword) {
      return alert("Passwords do not match");
    }

    await updateAdminProfile(profile);
    alert("Profile Updated Successfully");
  };

  return (
    <div className="settings-page">
      {/* breadcrumb */}
      <p className="breadcrumb">Home &gt; Settings</p>

      <div className="settings-card">
        <h3>Edit Profile</h3>

        <label>First name</label>
        <input
          name="firstName"
          value={profile.firstName}
          onChange={handleChange}
        />

        <label>Last name</label>
        <input
          name="lastName"
          value={profile.lastName}
          onChange={handleChange}
        />

        <label>Email</label>
        <input
          name="email"
          value={profile.email}
          onChange={handleChange}
        />

        <label>Password</label>
        <input
          type="password"
          name="password"
          placeholder="********"
          value={profile.password}
          onChange={handleChange}
        />

        <label>Confirm Password</label>
        <input
          type="password"
          name="confirmPassword"
          placeholder="********"
          value={profile.confirmPassword}
          onChange={handleChange}
        />

        <div className="settings-footer">
      <button className="save-btn" onClick={saveProfile}>
        Save 
      </button>
    </div>
      </div>
    </div>
  );
}