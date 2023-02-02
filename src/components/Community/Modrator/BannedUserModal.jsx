import React, { useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import BannedUserApi from './BannedUserApi'

const BannedUserModal = (props) => {
  const { bannedUser, setBannedUser, setNewBannedUser } = BannedUserApi()

  const onChange = (event) => {
    console.log(bannedUser)
    setBannedUser({
      ...bannedUser,
      [event.target.name]: event.target.value
    });
  }

  const onSubmit = (event) => {
    event.preventDefault();
    setNewBannedUser(bannedUser)
  }

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
          <form onSubmit={onSubmit}>
            <div class="form-group">
              <label for="username">Enter User Name</label>
              <Form.Select aria-label="username" name="username" onChange={onChange}>
                <option key='blankChoice' hidden value>Select Username</option>
                <option value="vasanth">vasanth</option>
                <option value="iamtusharxo">Tushar</option>
                <option value="sowndar">Sowndar</option>
                <option value="mithun">Mithun</option>
              </Form.Select>
            </div><br />
            <div class="form-group">
              <label for="reason">Reason For Ban</label>
            </div>
            <div>
            <Form.Select aria-label="reason" name="reason" onChange={onChange}>
                <option key='blankChoice' hidden value>Select Reason</option>
                <option value="Spam">Spam</option>
                <option value="Personal Confidential Information">Personal Confidential Information</option>
                <option value="Threatening Harassing or inciting violence">Threatening Harassing or inciting violence</option>
                <option value="Others">Others</option>
              </Form.Select>
            </div><br />
            <div class="form-group">
              <label for="explanation">Note to include in ban message</label>
              <textarea name="explanation" placeholder="Reason they were Banned" class="form-control" onChange={onChange}></textarea>
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
