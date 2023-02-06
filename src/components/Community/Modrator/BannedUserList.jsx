import React, { useEffect, useState } from 'react'
import { Card, ListGroup } from 'react-bootstrap'
import BannedUserApi from './BannedUserApi'

const BannedUserList = () => {
  const [bannedUsersList, setBannedUsersList] = useState('')
  const { get_banned_users_list_data } = BannedUserApi()

  useEffect(() => {
    let mounted = true;
    get_banned_users_list_data().then((items) => {
      if (mounted) {
        setBannedUsersList(items);
      }
    });
    return () => (mounted = false);
  }, []);

  return (
    <div>
      <Card>
        <Card.Header className='text-center'>
          <h4>Banned Users</h4>
        </Card.Header>
        <Card.Body>
          <Card.Subtitle className="mb-2 text-muted">Banned Usernames :</Card.Subtitle>
          <ListGroup variant="numbered">
            {bannedUsersList && bannedUsersList.map((bannedUser) => {
              return (
                <ListGroup.Item key={bannedUser.id}>{bannedUser.account.username}</ListGroup.Item>
              )
            })}
          </ListGroup>
        </Card.Body>
      </Card>
    </div>
  )
}

export default BannedUserList
