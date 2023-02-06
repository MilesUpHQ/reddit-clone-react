import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import BannedUserModal from './BannedUserModal';

const BannedUsers = () => {
  const [modalShow, setModalShow] = useState(false);

  return (
    <div>
      <Link to='' className="btn btn-primary w-100 rounded" onClick={() => setModalShow(true)}>Banned User</Link>
      <BannedUserModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </div>
  )
}

export default BannedUsers
