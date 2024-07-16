import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AddRepairModal({ onClose, onSuccess }) {
  const [clients, setClients] = useState([]);
  const [idClient, setIdClient] = useState('');
  const [appareil, setAppareil] = useState('');
  const [description, setDescription] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/fetchClients');
      setClients(response.data);
    } catch (error) {
      console.error('Error fetching clients:', error);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('http://localhost:5000/api/reparations', { idClient, appareil, description })
      .then(response => {
        console.log('Réparation ajoutée avec succès:', response.data);
        onSuccess('Réparation ajoutée avec succès');
        onClose(); 
      })
      .catch(error => {
        console.error('Erreur lors de l\'ajout de la réparation:', error.response);
        if (error.response && error.response.data && error.response.data.error) {
          setErrorMessage(error.response.data.error);
        } else {
          setErrorMessage('Erreur lors de l\'ajout de la réparation. Veuillez réessayer plus tard.');
        }
      });
  };

  return (
    <div id="addRepairModal" className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>Ajouter une Réparation</h2>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="appareil">Appareil :</label><br />
            <input
              type="text"
              id="appareil"
              name="appareil"
              value={appareil}
              onChange={(e) => setAppareil(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description :</label><br />
            <textarea
              id="description"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            ></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="idClient">Client :</label><br />
            <select
              id="idClient"
              name="idClient"
              value={idClient}
              onChange={(e) => setIdClient(e.target.value)}
              required>
              <option value="">Sélectionner un client</option>
              {clients.map(client => (
                <option key={client.client_id} value={client.client_id}>
                  {client.client_nom} - {client.client_email}
                </option>
              ))}
            </select>
          </div>
          <button type="submit">Ajouter</button>
        </form>
      </div>
    </div>
  );
}

export default AddRepairModal;
