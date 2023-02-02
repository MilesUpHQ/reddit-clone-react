import React from 'react'
import { Card, ListGroup } from 'react-bootstrap'

const BannedUserList = () => {
  return (
    <div>
      <Card>
        <Card.Header className='text-center'>
          <h4>Banned Users</h4>
        </Card.Header>
        <Card.Body>
          <Card.Subtitle className="mb-2 text-muted">Banned Usernames :</Card.Subtitle>
          <ListGroup variant="numbered">
            <ListGroup.Item>Username 1 banned</ListGroup.Item>
            <ListGroup.Item>Username 2 banned</ListGroup.Item>
            <ListGroup.Item>Username 3 banned</ListGroup.Item>
            <ListGroup.Item>Username 4 banned</ListGroup.Item>
            <ListGroup.Item>Username 5 banned</ListGroup.Item>
          </ListGroup>
        </Card.Body>
      </Card>
    </div>
  )
}

export default BannedUserList
