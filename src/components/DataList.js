import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Filtre from './Filtre'; 
import UpdateRepairModal from './UpdateRepairModal';

const DataList = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedRepairId, setSelectedRepairId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [repairStatus, setRepairStatus] = useState('Toutes');
  const [isFiltered, setIsFiltered] = useState(false); 
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/reparations');
      setData(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Erreur lors du chargement des réparations:', error);
      setError('Erreur lors du chargement des réparations');
      setLoading(false);
    }
  };

  const handleOpenModal = (reparationId) => {
    setSelectedRepairId(reparationId);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedRepairId(null);
    setIsModalOpen(false);
    fetchData(); 
  };

  const handleFilterData = (filteredData) => {
    setData(filteredData);
    setIsFiltered(true);
    if (filteredData.length > 0 && filteredData[0].reparation_statut) {
      setRepairStatus(filteredData[0].reparation_statut);
    } else {
      setRepairStatus('Aucune réparation trouvée');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Erreur: {error}</div>;
  }

  return (
    <div className="repair-list-container">
      <h2>Réparations: {isFiltered ? repairStatus : 'Toutes'}</h2>
      <Filtre setData={handleFilterData} />
      <ul className="repair-list">
        {data.map(item => (
          <li key={item.reparation_id}>  
            <h3>Client: {item.client_nom} // {item.client_email}</h3>
            <p>Appareil: {item.reparation_appareil}</p>
            <p>Description: {item.reparation_description}</p>
            <p>Date de dépôt: {new Date(item.reparation_date_depot).toLocaleDateString('fr-FR', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}</p>
            <p>Statut: {item.reparation_statut}</p>
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
