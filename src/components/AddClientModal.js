import React, { useState } from 'react';
import axios from 'axios';

function AddClientModal({ onClose }) {
  const [nom, setNom] = useState('');
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('http://localhost:5000/api/clients', { nom, email })
      .then(response => {
        console.log('Client ajouté avec succès:', response.data);
        onClose(); 
      })
      .catch(error => {
        console.error('Erreur lors de l\'ajout du client:', error);
        if (error.response && error.response.data && error.response.data.error) {
          setErrorMessage(error.response.data.error);
        } else {
          setErrorMessage('Erreur lors de l\'ajout du client. Veuillez réessayer plus tard.');
        }
      });
  };

  return (
    <div id="addClientModal" className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>Ajouter un Client</h2>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="nom">Nom :</label><br></br>
            <input
              type="text"
              id="nom"
              name="nom"
              value={nom}
              onChange={(e) => setNom(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email :</label><br></br>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button type="submit">Ajouter</button>
        </form>
      </div>
    </div>
  );
}

export default AddClientModal;
