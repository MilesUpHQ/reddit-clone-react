import React, { useEffect, useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import Select from 'react-select'
import { toast } from 'react-toastify'
import BannedUserApi from './BannedUserApi'
import SelectUsers from './SelectUsers'

const BannedUserModal = (props) => {
  const { bannedUser, bannedUserErrors, setBannedUser, setNewBannedUser } = BannedUserApi()
  const { options, handleInputChange } = SelectUsers()
  const [selectedUsername, setSelectedUsername] = useState(null)
  const current_account = JSON.parse(localStorage.getItem('account'))

  const reasons = [
    { value: 'Spam', label: 'Spam' },
    { value: 'Personal Confidential Information', label: 'Personal Confidential Information' },
    { value: 'Threatening Harassing or inciting violence', label: 'Threatening Harassing or inciting violence' },
    { value: 'Others', label: 'Others' }
  ]

  const onChange = (event) => {
    console.log(bannedUser)
    setBannedUser({
      ...bannedUser,
      [event.target.name]: event.target.value
    });
  }

  const onSelectChange = (event) => {
    console.log(event.value)
    setSelectedUsername(event)
    setBannedUser({
      ...bannedUser,
      'account_id': event.value
    });
    console.log(bannedUser)
  }

  const onSubmit = (event) => {
    event.preventDefault();
    if (bannedUser.account_id == current_account.id) {
      toast.warning(`The user ${current_account.username} is Moderator`);
    }
    else {
      setNewBannedUser(bannedUser)
    }
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
            <div className="form-group">
              <label>Enter User Name</label>
              <Select
                options={options}
                value={selectedUsername}
                onInputChange={handleInputChange}
                onChange={onSelectChange}
                placeholder="Search Username"
                styles={{
                  control: (base) => ({
                    ...base,
                    borderColor: bannedUserErrors && bannedUserErrors.account ? "#dc3545" : "#ccc"
                  })
                }}
              />
              {bannedUserErrors && bannedUserErrors.account ? <p className='text-danger'>Username {bannedUserErrors.account}</p> : <br />}
            </div>
            <div className="form-group">
              <label>Reason For Ban</label>
            </div>
            <div>
              {/* <Select options={reasons} name="reason" className={bannedUserErrors && bannedUserErrors.reason ? 'border-danger' : ''} /> */}
              <Form.Select aria-label="reason" name="reason" className={bannedUserErrors && bannedUserErrors.reason ? 'border-danger' : ''} onChange={onChange}>
                <option key='blankChoice' hidden value>Select Reason</option>
                <option value="Spam">Spam</option>
                <option value="Personal Confidential Information">Personal Confidential Information</option>
                <option value="Threatening Harassing or inciting violence">Threatening Harassing or inciting violence</option>
                <option value="Others">Others</option>
              </Form.Select>
              {bannedUserErrors && bannedUserErrors.reason ? <p className='text-danger'>Reason {bannedUserErrors.reason}</p> : <br />}
            </div>
            <div className="form-group">
              <label>Note to include in ban message</label>
              <textarea name="explanation" placeholder="Reason they were Banned" className={bannedUserErrors && bannedUserErrors.explanation ? 'form-control border-danger' : 'form-control'} onChange={onChange}></textarea>
              {bannedUserErrors && bannedUserErrors.explanation ? <p className='text-danger'>Explanation {bannedUserErrors.explanation}</p> : <br />}
            </div><br />
            <div className="form-group d-flex gap-3">
              <button type="button" className="btn btn-primary" data-dismiss="modal">Cancel</button>
              <input type="submit" value="Ban user" className="btn btn-primary" />
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
