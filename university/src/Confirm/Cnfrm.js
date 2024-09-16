import React, { useState } from 'react';
import axios from 'axios';

const ConfirmationModal = ({ id, loadStudents }) => {
  const [showModal, setShowModal] = useState(false);

  const deleteStudent = async () => {
    await axios.delete(`http://localhost:8080/student/${id}`);
    alert('Ok! Delete complete');
    loadStudents();
    setShowModal(false);
  };

  return (
    <div>
      <button onClick={() => setShowModal(true)}>Delete</button>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <p>Are you sure you want to delete this student?</p>
            <button onClick={deleteStudent}>Yes</button>
            <button onClick={() => setShowModal(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConfirmationModal;
