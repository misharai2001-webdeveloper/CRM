import React, { useEffect, useState, useCallback, useRef } from "react";
import { getLeads } from "../api/leadApi";
import { uploadCSV } from "../api/uploadApi";
import { updateLeadStatus , updateScheduleDate } from "../api/updateLeadApi";
import AddLeadModal from "../components/leads/AddLeadModal";
import "../styles/leads.css";


export default function Leads() {
  const [leads, setLeads] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  
  
  const [updatingId, setUpdatingId] = useState(null);
  const [openModal, setOpenModal] = useState(false);
const [showCSVModal, setShowCSVModal] = useState(false);
const [csvFile, setCsvFile] = useState(null);
  const fileInputRef = useRef();
  const [csvStep, setCsvStep] = useState(1); 


  // 🔹 Fetch Leads
  const fetchLeads = useCallback(async (currentPage = page) => {
  try {
    const data = await getLeads(currentPage);

    setLeads(data.leads);
    setPage(data.page);
    setTotalPages(data.pages);

  } catch (err) {
    console.log(err);
  }
}, [page]);

 useEffect(() => {
  fetchLeads(page);
}, [fetchLeads, page]);

const changePage = (newPage) => {
  if (newPage < 1 || newPage > totalPages) return;
  fetchLeads(newPage);
};
  const handleScheduleChange = async (leadId, date) => {
  try {
    await updateScheduleDate(leadId, date);
    fetchLeads();
  } catch {
    alert("Failed to update schedule date");
  }
};

  // 🔹 CSV Upload
  const handleCSVUpload = async (file) => {
  if (!file) return;

  try {
    await uploadCSV(file);
    fetchLeads();
  } catch (err) {
    alert("Upload failed");
  }
};

  // 🔹 Status Update
  const handleStatusChange = async (leadId, newStatus) => {
    try {
      setUpdatingId(leadId);
      await updateLeadStatus(leadId, newStatus);
      fetchLeads();
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div className="leads-page">

      {/* HEADER ROW */}
      <div className="header-row">
        <h2 className="page-heading">
          Home <span>›</span> <b>Leads</b>
        </h2>

        <div className="top-actions">
          <button
            className="primary-btn"
            onClick={() => setOpenModal(true)}
          >
            + Add Manually
          </button>

          <input
            type="file"
            ref={fileInputRef}
            accept=".csv"
            style={{ display: "none" }}
            onChange={(e) => handleCSVUpload(e.target.files[0])}
          />

          <button
  className="upload-btn"
  onClick={() => setShowCSVModal(true)}
>
  Add CSV
</button>
        </div>
      </div>

      {/* TABLE */}
      <div className="table-card">
        <table className="leads-table">
          <thead>
            <tr>
              <th>No.</th>
              <th>Name</th>
              <th>Email</th>
              <th>Source</th>
              <th>Date</th>
              <th>Location</th>
              <th>Language</th>
              <th>Assigned</th>
              <th>Status</th>
              <th>Type</th>
              <th>Scheduled</th>
            </tr>
          </thead>

          <tbody>
            {leads.length === 0 ? (
              <tr>
                <td colSpan="11" className="text-center">
                  No Leads Found
                </td>
              </tr>
            ) : (
              leads.map((lead, i) => (
                <tr key={lead._id}>
                  <td>{i + 1}</td>
                  <td className="name-cell">{lead.name}</td>
                  <td>{lead.email}</td>
                  <td>{lead.source}</td>
                  <td>{new Date(lead.createdAt).toLocaleDateString()}</td>
                  <td>{lead.location || "Mumbai"}</td>
                  <td>{lead.language || "English"}</td>
                  <td className="assigned-cell">
  {lead.assignedTo ? (
    <div className="assigned-info">
      <div className="avatar">
        {lead.assignedTo.name?.charAt(0)}
      </div>
      <span>{lead.assignedTo.name}</span>
    </div>
  ) : (
    <span className="unassigned">Unassigned</span>
  )}
</td>

                  <td>
                    <select
                      className={`status ${lead.status}`}
                      value={lead.status}
                      disabled={updatingId === lead._id}
                      onChange={(e) =>
                        handleStatusChange(lead._id, e.target.value)
                      }
                    >
                      <option value="Ongoing">Ongoing</option>
<option value="New">New</option>
<option value="Hot">Hot</option>
<option value="Warm">Warm</option>
<option value="Cold">Cold</option>
<option value="Scheduled">Scheduled</option>
                    </select>
                  </td>

                  <td>{lead.type || "Warm"}</td>
                  <td>
  <input
    type="date"
    className="date-input"
    value={lead.scheduledDate ? lead.scheduledDate.split("T")[0] : ""}
    onChange={(e) =>
      handleScheduleChange(lead._id, e.target.value)
    }
  />
</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* PAGINATION */}
    <div className="pagination">

  {/* Previous */}
  <button
    onClick={() => changePage(page - 1)}
    disabled={page === 1}
  >
    ← Previous
  </button>

  {/* Current Page */}
  <div className="pages">
    <span className="active">{page}</span>
    <span className="total">of {totalPages}</span>
  </div>

  {/* Next */}
  <button
    onClick={() => changePage(page + 1)}
    disabled={page === totalPages}
  >
    Next →
  </button>

</div>

      {/* ADD LEAD MODAL */}
      <AddLeadModal
  isOpen={openModal}
  onClose={() => setOpenModal(false)}
  onSuccess={fetchLeads}
/>

{/* ================= CSV UPLOAD MODAL ================= */}
{showCSVModal && (
  <div className="modal-overlay">
    <div className="csv-modal">
      
      <div className="modal-header">
        <h3>CSV Upload</h3>
        <span onClick={() => setShowCSVModal(false)}>✕</span>
      </div>

      

      {/* Upload Box */}
      {csvStep === 1 ? (
  <div className="upload-box">
    <p>Drag your file(s) to start uploading</p>
    <span>OR</span>

    <input
      type="file"
      accept=".csv"
      id="csvInput"
      hidden
      onChange={(e) => setCsvFile(e.target.files[0])}
    />

    <label htmlFor="csvInput" className="browse-btn">
      Browse files
    </label>

    {csvFile && <p className="file-name">{csvFile.name}</p>}
  </div>
) : (
  <div className="verifying-box">
  <div className="spinner"></div>
  <p>Verifying...</p>

  <div className="verify-actions">
    <button
      className="cancel-btn"
      onClick={() => {
        setCsvStep(1);
        setCsvFile(null);
      }}
    >
      Cancel
    </button>

    <button
      className="upload-final-btn"
      onClick={async () => {
        await handleCSVUpload(csvFile);
        setCsvStep(1);
        setShowCSVModal(false);
        setCsvFile(null);
      }}
    >
      Upload
    </button>
  </div>
</div>
)}

      {/* Buttons */}
      {csvStep === 1 && (
  <div className="modal-actions">
    <button
      className="cancel-btn"
      onClick={() => setShowCSVModal(false)}
    >
      Cancel
    </button>

    <button
  className="next-btn"
  onClick={() => {
    if (!csvFile) return alert("Please select CSV");
    setCsvStep(2); // go to verifying screen only
  }}
>
  Next →
</button>
  </div>
)}
    </div>
  </div>
)}

    </div>
  );
}