import React from "react";

function EditEmployeeModal({ user, close }) {
  return (
    <div className="modal">
      <div className="modal-box">
        <h3>Edit {user.name}</h3>

        <input defaultValue={user.name} />
        <input defaultValue={user.status} />

        <button>Save</button>
        <button onClick={close}>Cancel</button>
      </div>
    </div>
  );
}

export default EditEmployeeModal;