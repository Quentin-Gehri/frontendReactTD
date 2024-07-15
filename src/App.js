import React, { useState } from 'react';
import './App.css';
import { Helmet } from 'react-helmet';
import Header from './components/Header';
import Content from './components/Content';
import AddRepairModal from './components/AddRepairModal';
import AddClientModal from './components/AddClientModal';
import UpdateRepairModal from './components/UpdateRepairModal';
import Footer from './components/Footer';

const App = () => {
  const [isAddRepairModalOpen, setIsAddRepairModalOpen] = useState(false);
  const [isAddClientModalOpen, setIsAddClientModalOpen] = useState(false);
  const [selectedRepairId, setSelectedRepairId] = useState(null);

  const openAddRepairModal = () => {
    setIsAddRepairModalOpen(true);
  };

  const closeAddRepairModal = () => {
    setIsAddRepairModalOpen(false);
  };

  const openAddClientModal = () => {
    setIsAddClientModalOpen(true);
  };

  const closeAddClientModal = () => {
    setIsAddClientModalOpen(false);
  };

  const handleOpenUpdateModal = (reparationId) => {
    setSelectedRepairId(reparationId);
  };

  const handleCloseUpdateModal = () => {
    setSelectedRepairId(null);
  };

  return (
    <div className="App">
      <Helmet>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Liste des Réparations - Réparateur Expert</title>
      </Helmet>
      <Header
        onOpenAddClientModal={openAddClientModal}
        onOpenAddRepairModal={openAddRepairModal}
      />
      <Content
        onOpenUpdateRepairModal={handleOpenUpdateModal}
      />
      {isAddRepairModalOpen && (
        <AddRepairModal onClose={closeAddRepairModal} />
      )}
      {isAddClientModalOpen && (
        <AddClientModal onClose={closeAddClientModal} />
      )}
      {selectedRepairId !== null && (
        <UpdateRepairModal
          repairId={selectedRepairId}
          onClose={handleCloseUpdateModal}
        />
      )}
      <Footer />
    </div>
  );
};

export default App;
