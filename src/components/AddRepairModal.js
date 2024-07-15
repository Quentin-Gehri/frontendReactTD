import React from 'react';

function AddRepairModal({ onClose }) {
  return (
      <div id="addRepairModal" className="modal">
              <div class="modal-content">
                  <span class="close" onClick={onClose}>&times;</span>
                  <h2>Ajouter une Réparation</h2>
                  <form action="" method="post">
                     
                  </form>
              </div>
          </div>
     );
}

export default AddRepairModal;