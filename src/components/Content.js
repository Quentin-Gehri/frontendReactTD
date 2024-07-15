import React from 'react';
import DataList from './DataList';

function Content({ onOpenUpdateRepairModal }) {
  return (
    <main className="App-content">
      <h2>Réparations</h2>
      <DataList onOpenUpdateRepairModal={onOpenUpdateRepairModal} />
    </main>
  );
}

export default Content;
