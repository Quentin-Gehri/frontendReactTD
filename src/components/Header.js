import React from 'react';

function Header({ onOpenAddClientModal, onOpenAddRepairModal, successMessage }) {
  return (
    <header className="App-header">
      <h1>Réparateur Expert</h1>
      <button onClick={onOpenAddClientModal}>Ajouter un Client</button>
      <button onClick={onOpenAddRepairModal}>Ajouter une Réparation</button>
      {successMessage && <div className="success-message">{successMessage}</div>}
    </header>
  );
}

export default Header;
