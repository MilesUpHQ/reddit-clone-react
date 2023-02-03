import React, { useEffect, useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import { toast } from 'react-toastify'
import BannedUserApi from './BannedUserApi'
import ModratorApi from './ModratorApi'

const BannedUserModal = (props) => {
  const { bannedUser, bannedUserErrors, setBannedUser, setNewBannedUser } = BannedUserApi()
  const { joinedAccounts, setJoinedAccounts, GetJoinedAccounts } = ModratorApi()
  const current_account = JSON.parse(localStorage.getItem('account'))

  useEffect(() => {
    let mounted = true;
    GetJoinedAccounts().then((items) => {
      if (mounted) {
        setJoinedAccounts(items)
      }
    });
    return () => (mounted = false);
  }, []);

  const onChange = (event) => {
    console.log(bannedUser)
    setBannedUser({
      ...bannedUser,
      [event.target.name]: event.target.value
    });
  }

  const onSubmit = (event) => {
    event.preventDefault();
    if(bannedUser.account_id == current_account.id) {
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
            <div class="form-group">
              <label for="username">Enter User Name</label>
              <Form.Select aria-label="username" className={bannedUserErrors && bannedUserErrors.account ? 'border-danger' : ''} name="account_id" onChange={onChange}>
                <option key='blankChoice' hidden value>Select Username</option>
                {joinedAccounts && joinedAccounts.map((account) => {
                  return (
                    <option value={account.account.id}>{account.account.username}</option>
                  )
                })}
              </Form.Select>
              { bannedUserErrors && bannedUserErrors.account ? <p className='text-danger'>Username {bannedUserErrors.account}</p> : <br /> }
            </div>
            <div class="form-group">
              <label for="reason">Reason For Ban</label>
            </div>
            <div>
              <Form.Select aria-label="reason" name="reason" className={bannedUserErrors && bannedUserErrors.reason ? 'border-danger' : ''} onChange={onChange}>
                <option key='blankChoice' hidden value>Select Reason</option>
                <option value="Spam">Spam</option>
                <option value="Personal Confidential Information">Personal Confidential Information</option>
                <option value="Threatening Harassing or inciting violence">Threatening Harassing or inciting violence</option>
                <option value="Others">Others</option>
              </Form.Select>
              { bannedUserErrors && bannedUserErrors.reason ? <p className='text-danger'>Reason {bannedUserErrors.reason}</p> : <br /> }
            </div>
            <div class="form-group">
              <label for="explanation">Note to include in ban message</label>
              <textarea name="explanation" placeholder="Reason they were Banned"  className={bannedUserErrors && bannedUserErrors.explanation ? 'form-control border-danger' : 'form-control'} onChange={onChange}></textarea>
              { bannedUserErrors && bannedUserErrors.explanation ? <p className='text-danger'>Explanation {bannedUserErrors.explanation}</p> : <br/>}
            </div><br />
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
