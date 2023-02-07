import React, { useEffect, useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import Select from 'react-select'
import { toast } from 'react-toastify'
import BannedUserApi from './BannedUserApi'
import SelectUsers from './SelectUsers'

const BannedUserModal = (props) => {
  const { bannedUser, bannedUserErrors, setBannedUser, setNewBannedUser } = BannedUserApi()
  const { options, handleInputChange } = SelectUsers()
  const [permanent, setpermanent] = useState(true)
  const [duration, setduration] = useState(null)
  const [explanation, setexplanation] = useState("")
  const [durationError, setDurationError] = useState('');
  const [selectedUsername, setSelectedUsername] = useState(null)
  const [selectedReason, setSelectedReason] = useState(null)
  const current_account = JSON.parse(localStorage.getItem('account'))

  const reasons = [
    { value: 'Spam', label: 'Spam' },
    { value: 'Personal Confidential Information', label: 'Personal Confidential Information' },
    { value: 'Threatening Harassing or inciting violence', label: 'Threatening Harassing or inciting violence' },
    { value: 'Others', label: 'Others' }
  ]

  const onChange = (event) => {
    const value = parseInt(event.target.value, 10);
    console.log(value)
    if (value <= 0) {
      setDurationError('Duration must be a positive number');
    } else {
      setduration(event.target.value)
      setBannedUser({
        ...bannedUser,
        'duration': event.target.value
      });
      console.log(bannedUser.duration)
    }
  }


  const onExplain = (event) => {
    setexplanation(event.target.value)
    setBannedUser({
      ...bannedUser,
      'explanation': event.target.value
    });
    console.log(bannedUser.duration)
  }

  const onSelectUsername = (event) => {
    setSelectedUsername(event)
    setBannedUser({
      ...bannedUser,
      'account_id': event.value
    });
  }

  const onSelectReason = (event) => {
    setSelectedReason(event)
    setBannedUser({
      ...bannedUser,
      'reason': event.value
    });
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

  const permanentcheck = (event) => {
    setpermanent(event.target.checked)
    setBannedUser({
      ...bannedUser,
      'permanent': event.target.checked,
      'duration': null
    });
    setduration(null)
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
                onChange={onSelectUsername}
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
              <Select
                options={reasons}
                value={selectedReason}
                isSearchable={false}
                onChange={onSelectReason}
                placeholder="Search Reason"
                styles={{
                  control: (base) => ({
                    ...base,
                    borderColor: bannedUserErrors && bannedUserErrors.reason ? "#dc3545" : "#ccc"
                  })
                }}
              />
              {bannedUserErrors && bannedUserErrors.reason ? <p className='text-danger'>Reason {bannedUserErrors.reason}</p> : <br />}
            </div>
            <div className="form-group">
              <label>Note to include in ban message</label>
              <textarea name="explanation" placeholder="Reason they were Banned" className={bannedUserErrors && bannedUserErrors.explanation ? 'form-control border-danger' : 'form-control'} onChange={onExplain}></textarea>
              {bannedUserErrors && bannedUserErrors.explanation ? <p className='text-danger'>Explanation {bannedUserErrors.explanation}</p> : <br />}
            </div><br />
            <div className="form-group">
              <label>Ban Duration (in days)</label>
              <input type="number" name="duration" placeholder="Ban Duration" disabled={permanent} className='form-control' onChange={onChange} />
              {bannedUserErrors && bannedUserErrors.duration ? <p className='text-danger'>Ban Duration {bannedUserErrors.duration}</p> : <br />}
              {durationError && <p className="text-danger">{durationError}</p>}<br/>
            </div>
            <div className="form-check">
              <label>Permanent Ban</label>
              <input type="checkbox" name="permanent_ban" className="form-check-input" onChange={permanentcheck} checked={permanent} />
            </div><br />
            <div className="form-group d-flex gap-3">
              <button type="button" onClick={props.onHide} className="btn btn-transparent" data-dismiss="modal">Cancel</button>
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
