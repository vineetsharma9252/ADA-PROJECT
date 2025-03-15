import React from "react";
import "./Modal.css";

const Modal = ({ message, onClose, onConfirm }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <p>{message}</p>
        <div className="modal-buttons">
          <button onClick={onClose} className="modal-button cancel">
            Cancel
          </button>
          <button onClick={onConfirm} className="modal-button confirm">
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
