// frontend/src/components/Content.js

import React from 'react';
import DataList from './DataList'; // Importez le composant DataList

function Content() {
  return (
    <main className="App-content">
      <h2>Réparations</h2>
      <DataList /> 
    </main>
  );
}

export default Content;
