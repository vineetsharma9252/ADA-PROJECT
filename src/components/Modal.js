import React from "react";
import DOMPurify from "dompurify";
import "./Modal.css";

const Modal = ({ message, onClose, onConfirm }) => {
  const sanitizedMessage = DOMPurify.sanitize(message);
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div dangerouslySetInnerHTML={{ __html: sanitizedMessage }} />
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
