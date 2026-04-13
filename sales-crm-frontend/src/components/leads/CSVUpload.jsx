import React from "react";

function CSVUpload() {
  return (
    <div className="table-box">
      <h3>Upload Leads CSV</h3>
      <input type="file" accept=".csv" />
      <button>Upload</button>
    </div>
  );
}

export default CSVUpload;