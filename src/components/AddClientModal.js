import React from 'react';

function AddClientModal({ onClose }) {
  return (
    <div id="addClientModal" className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>Ajouter un Client</h2>
        <form action="" method="post">
          {/* Contenu du formulaire à ajouter ici */}
        </form>
      </div>
    </div>
  );
}

export default AddClientModal;
