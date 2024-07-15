import React, { useState } from 'react';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Content from './components/Content';
import AddRepairModal from './components/AddRepairModal';
import AddClientModal from './components/AddClientModal';

function App() {
  const [isAddRepairModalOpen, setAddRepairModalOpen] = useState(false);
  const [isAddClientModalOpen, setAddClientModalOpen] = useState(false);

  const openAddRepairModal = () => {
    setAddRepairModalOpen(true);
  };

  const closeAddRepairModal = () => {
    setAddRepairModalOpen(false);
  };

  const openAddClientModal = () => {
    setAddClientModalOpen(true);
  };

  const closeAddClientModal = () => {
    setAddClientModalOpen(false);
  };

  return (
    <div className="App">
      <Header
        onOpenAddClientModal={openAddClientModal}
        onOpenAddRepairModal={openAddRepairModal}
      />
      <Content />
      
      {isAddRepairModalOpen && (
        <AddRepairModal onClose={closeAddRepairModal} />
      )}

      {isAddClientModalOpen && (
        <AddClientModal onClose={closeAddClientModal} />
      )}

      <Footer />
    </div>
  );
}

export default App;
