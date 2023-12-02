import React from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const modalStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '300px', 
  },
};

const ConfirmationModal = ({ isOpen, onRequestClose, onConfirm }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Confirmation Modal"
      style={modalStyles}
    >
      <h2>Are you sure you want to delete this product?</h2>
      <div style={{ display: 'flex', justifyContent: 'space-around' }}>
        <button onClick={onConfirm}>Yes</button>
        <button onClick={onRequestClose}>No</button>
      </div>
    </Modal>
  );
};

export default ConfirmationModal;
