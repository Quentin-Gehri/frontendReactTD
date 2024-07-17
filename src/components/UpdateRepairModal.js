import React, { useState, useEffect } from 'react';
import axios from 'axios';

function UpdateRepairModal ({ repairId, onClose }) {
  const [reparation, setReparation] = useState({
    reparation_appareil: '',
    reparation_description: '',
    statut: ''
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/reparations/${repairId}`);
        const { reparation_appareil, reparation_description, reparation_statut } = response.data;
        setReparation({
          reparation_appareil,
          reparation_description,
          statut: reparation_statut
        });
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching repair details:', error);
        setError('Error fetching repair details');
        setIsLoading(false);
      }
    };

    fetchData();
  }, [repairId]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setReparation((prevReparation) => ({ ...prevReparation, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { reparation_appareil, reparation_description, statut } = reparation;

    try {
      await axios.put(`http://localhost:5000/api/updateReparation/${repairId}`, { 
        appareil: reparation_appareil, 
        description: reparation_description, 
        statut 
      });
      console.log('Repair updated successfully');
      onClose();
      window.location.reload();
    } catch (error) {
      console.error('Error updating repair:', error);
      if (error.response && error.response.data && error.response.data.error) {
        setErrorMessage(error.response.data.error);
      } else {
        setErrorMessage('Erreur lors de l\'ajout de la réparation. Veuillez réessayer plus tard.');
      }
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
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        <form onSubmit={handleSubmit}>
          <label htmlFor="reparation_appareil">Appareil:</label>
          <input 
            type="text" 
            id="reparation_appareil" 
            name="reparation_appareil"  
            onChange={handleChange} 
            value={reparation.reparation_appareil} 
          />

          <label htmlFor="reparation_description">Description:</label>
          <textarea 
            id="reparation_description" 
            name="reparation_description"  
            onChange={handleChange} 
            value={reparation.reparation_description}
          ></textarea>

          <label htmlFor="statut">Statut:</label>
          <select 
            id="statut" 
            name="statut"  
            onChange={handleChange} 
            value={reparation.statut}
          >
            <option value="À faire">À faire</option>
            <option value="En cours">En cours</option>
            <option value="Terminé">Terminé</option>
          <option value="Repris par le client">Repris par le client</option>
        </select>
          <button type="submit">Enregistrer</button>
        </form>
      </div>
    </div>
  );
};

export default UpdateRepairModal;
