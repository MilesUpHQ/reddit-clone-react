import React, { useState, useEffect } from 'react';
import DraftList from './DraftList';
import { Button, Form, Modal } from 'react-bootstrap';

const Draft = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        closeModal();
      }
    };
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [closeModal]);

  return (
    <>
      <button type="button" className="draft-btn d-flex gap-2" onClick={openModal}>DRAFTS
        <span className='draft-badge'>0</span>
      </button>

      <Modal show={isOpen} onHide={closeModal} aria-labelledby="contained-modal-title-vcenter" centered>
        <Modal.Header closeButton>
          <Modal.Title>Drafts</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div >
            <DraftList drafts={props.drafts} />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Draft;
