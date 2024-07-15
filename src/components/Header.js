import React from 'react';

function Header({ onOpenAddClientModal, onOpenAddRepairModal }) {
  return (
    <header className="App-header">
      <h1>Réparateur Expert</h1>
      <button onClick={onOpenAddClientModal}>Ajouter un Client</button>
      <button onClick={onOpenAddRepairModal}>Ajouter une Réparation</button>
    </header>
  );
}

export default Header;
