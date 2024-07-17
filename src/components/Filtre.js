import React, { useState } from 'react';
import axios from 'axios';

const Filtre = ({ setData }) => {
  const [statut, setStatut] = useState('À faire');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/filterRepair', { statut });
      setData(response.data);
    } catch (error) {
      console.error('Erreur lors du filtrage des réparations:', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="statut">Statut:</label>
        <select id="statut" name="statut" value={statut} onChange={(e) => setStatut(e.target.value)}>
          <option value="À faire">À faire</option>
          <option value="En cours">En cours</option>
          <option value="Terminé">Terminé</option>
          <option value="Repris par le client">Repris par le client</option>
        </select>
        <button type="submit">Filtrer</button>
      </form>
    </div>
  );
};

export default Filtre;
