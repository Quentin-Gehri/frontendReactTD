import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UpdateRepairModal from './UpdateRepairModal'; 

const DataList = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedRepairId, setSelectedRepairId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); 
  useEffect(() => {
    axios.get('http://localhost:5000/api/reparations')
      .then(response => {
        setData(response.data);
        setLoading(false);
      })
      .catch(error => {
        if (error.response) {
          console.error('Error response from server:', error.response);
          setError('Error response from server');
        } else if (error.request) {
          console.error('No response received:', error.request);
          setError('No response received');
        } else {
          console.error('Error setting up the request:', error.message);
          setError('Error setting up the request');
        }
        setLoading(false);
      });
  }, []);

  const handleOpenModal = (reparationId) => {
    setSelectedRepairId(reparationId);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedRepairId(null);
    setIsModalOpen(false);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="repair-list-container">
      <ul className="repair-list">
        {data.map(item => (
          <li key={item.reparation_id}>
            <h3>Client: {item.client_nom} // {item.client_email}</h3>
            <p>Appareil: { item.reparation_appareil }</p>
            <p>Description: { item.reparation_description }</p>
            <p>Date de dépôt: {new Date(item.reparation_date_depot).toLocaleDateString('fr-FR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
            })}</p>
            <p>Statut: { item.reparation_statut }</p>
            <button onClick={() => handleOpenModal(item.reparation_id)}>Modifier</button>
          </li>
        ))}
      </ul>
      {isModalOpen && selectedRepairId && (
        <UpdateRepairModal
          repairId={selectedRepairId}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default DataList;
