import React, { useState, useEffect } from "react";
import "./modal.css";

const AddEmployeeModal = ({ isOpen, onClose, onSave, initialData }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    department: "",
    designation: "",
    language: "language",   // ⭐ MOST IMPORTANT

    status: "Active",
  });

  // ⭐ Prefill form when editing
  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData({
        name: "",
        email: "",
        phone: "",
        department: "",
        designation: "",
        language: "language",   // ⭐ MOST IMPORTANT

        status: "Active",
      });
    }
  }, [initialData]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSaveClick = () => {
    onSave(formData);
  };

  return (
    <div className="modalOverlay">
      <div className="modalBox">
        <div className="modalHeader">
          <h3>{initialData ? "Edit Employee" : "Add New Employee"}</h3>
          <span className="closeBtn" onClick={onClose}>✕</span>
        </div>

        <div className="modalBody">
          <label>Full Name</label>
          <input name="name" value={formData.name} onChange={handleChange} />

          <label>Email</label>
          <input name="email" value={formData.email} onChange={handleChange} />

          <label>Phone</label>
          <input name="phone" value={formData.phone} onChange={handleChange} />

          <label>Department</label>
          <input name="department" value={formData.department} onChange={handleChange} />

          <label>Designation</label>
          <input name="designation" value={formData.designation} onChange={handleChange} />

          

          <label>Language</label>
          <input name="language" value={formData.language} onChange={handleChange} />


          <label>Status</label>
          <select name="status" value={formData.status} onChange={handleChange}>
            <option>Active</option>
            <option>Inactive</option>
          </select>
        </div>

        <div className="modalFooter">
          <button className="cancelBtn" onClick={onClose}>Cancel</button>
          <button className="saveBtn" onClick={handleSaveClick}>
            {initialData ? "Update" : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddEmployeeModal;