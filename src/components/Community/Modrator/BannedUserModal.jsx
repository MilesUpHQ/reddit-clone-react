import React from 'react'
import { Button, Form, Modal } from 'react-bootstrap'

const BannedUserModal = (props) => {
  return (
    <div>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Ban a User
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form action="#" method="post">
            <div class="form-group">
              <input type="hidden" name="community_id" value="" />
            </div>
            <div class="form-group">
              <label for="username">Enter User Name</label>
              <Form.Select aria-label="username">
                <option key='blankChoice' hidden value>Select Username</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </Form.Select>
            </div><br />
            <div class="form-group">
              <label for="reason">Reason For Ban</label>
            </div>
            <div>
            <Form.Select aria-label="reason">
                <option key='blankChoice' hidden value>Select Reason</option>
                <option value="Spam">Spam</option>
                <option value="Personal Confidential Information">Personal Confidential Information</option>
                <option value="Threatening Harassing or inciting violence">Threatening Harassing or inciting violence</option>
                <option value="Others">Others</option>
              </Form.Select>
            </div><br />
            <div class="form-group">
              <label for="explanation">Note to include in ban message</label>
              <textarea name="explanation" placeholder="Reason they were Banned" class="form-control"></textarea>
            </div><br /><br />
            <div class="form-group d-flex gap-3">
              <button type="button" class="btn btn-primary" data-dismiss="modal">Cancel</button>
              <input type="submit" value="Ban user" class="btn btn-primary" />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default BannedUserModal
