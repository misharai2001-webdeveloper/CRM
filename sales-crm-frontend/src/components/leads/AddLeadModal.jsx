import React, { useState } from "react";
import { createLead } from "../../api/createLeadApi";
import "../../styles/addLeadModal.css";

export default function AddLeadModal({ isOpen, onClose, onSuccess }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    source: "",
    date: "",
    location: "",
    language: ""
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSave = async () => {
    try {
      setLoading(true);

      await createLead({
        name: form.name,
        email: form.email,
        source: form.source,
        location: form.location,
        language: form.language,
        createdAt: form.date
      });

      alert("Lead created successfully ✅");

      onClose();
      onSuccess(); // 🔥 refresh table

      setForm({
        name: "",
        email: "",
        source: "",
        date: "",
        location: "",
        language: ""
      });

    } catch (err) {
      alert("Failed to create lead");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">

        <div className="modal-header">
          <h3>Add New Lead</h3>
          <span className="close" onClick={onClose}>✕</span>
        </div>

        <div className="modal-body">
          <label>Name</label>
          <input name="name" value={form.name} onChange={handleChange} />

          <label>Email</label>
          <input name="email" value={form.email} onChange={handleChange} />

          <label>Source</label>
          <input name="source" value={form.source} onChange={handleChange} />

          <label>Date</label>
          <input name="date" value={form.date} onChange={handleChange} />

          <label>Location</label>
          <input name="location" value={form.location} onChange={handleChange} />

          <label>Preferred Language</label>
          <input name="language" value={form.language} onChange={handleChange} />

          <button className="save-btn" onClick={handleSave} disabled={loading}>
            {loading ? "Saving..." : "Save"}
          </button>
        </div>

      </div>
    </div>
  );
}