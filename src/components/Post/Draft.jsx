import React, { useState } from 'react';
import DraftList from './DraftList';

const Draft = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <>
      <button type="button" className="draft-btn" onClick={openModal}>Drafts</button>
      <div className={`modal ${isOpen ? 'show' : ''}`} tabIndex="-1" role="dialog">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Drafts</h4>
              <button type="button" className="close" onClick={closeModal} aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <DraftList drafts={props.drafts} />
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-primary" onClick={closeModal}>Close</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Draft;