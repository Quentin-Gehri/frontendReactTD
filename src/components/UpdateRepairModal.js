import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UpdateRepairModal = ({ repairId, onClose }) => {
  const [reparation, setReparation] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/data/${repairId}`);
        setReparation(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching repair details:', error);
        setError('Error fetching repair details');
        setIsLoading(false);
      }
    };

    fetchData();
  }, [repairId]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    try {
      await axios.post(`http://localhost:5000/api/update/${repairId}`, formData);
      console.log('Repair updated successfully');
      onClose();
    } catch (error) {
      console.error('Error updating repair:', error);
    }
  };

  if (!repairId || isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>Modifier Réparation</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="appareil">Appareil:</label>
          <input type="text" id="appareil" name="appareil" defaultValue={reparation.reparation_appareil} />

          <label htmlFor="description">Description:</label>
          <textarea id="description" name="description" defaultValue={reparation.reparation_description}></textarea>

          <label htmlFor="statut">Statut:</label>
          <select id="statut" name="statut" defaultValue={reparation.statut}>
            <option value="a_faire">À faire</option>
            <option value="en_cours">En cours</option>
            <option value="termine">Terminé</option>
          </select>

          <button type="submit">Enregistrer</button>
        </form>
      </div>
    </div>
  );
};

export default UpdateRepairModal;
