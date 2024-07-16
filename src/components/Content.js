import React from 'react';
import DataList from './DataList';

function Content({ onOpenUpdateRepairModal }) {
  return (
    <main className="App-content">
      <DataList onOpenUpdateRepairModal={onOpenUpdateRepairModal} />
    </main>
  );
}

export default Content;
