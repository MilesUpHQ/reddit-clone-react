import React from 'react'
import BannedUserList from './BannedUserList'
import BannedUsers from './BannedUsers'
import '../../../css/Community.css'

import { Card, Col, ListGroup, Nav, Row, Tab } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

const Modrator = () => {
  const { id } = useParams();

  return (
    <div className='community_post'>
      <Tab.Container id="left-tabs-example" defaultActiveKey="first">
        <Row>
          <Col sm={3}>
            <Nav variant="pills" className="card p-0 flex-column">
              <Nav.Item>
                <Nav.Link disabled eventKey="" className='mod-nav-link text-center bg-secondary text-white'>User Management</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="first" className='mod-nav-link'>Ban User</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="second" className='mod-nav-link'>Edit Community</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link disabled eventKey="" className='mod-nav-link text-center bg-secondary text-white'>Mod Help Center</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="third" className='mod-nav-link'>Help Center</Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
          <Col sm={8}>
            <Tab.Content>
              <Tab.Pane eventKey="first">
                <Row>
                  <Col sm={9}>
                    <BannedUserList />
                  </Col>
                  <Col sm={3}>
                    <BannedUsers />
                  </Col>
                </Row>
              </Tab.Pane>
              <Tab.Pane eventKey="second">
                <Card>
                  <Card.Header className='text-center'>
                    <h4>Edit Community</h4>
                  </Card.Header>
                  <Card.Body>
                    <Card.Title>Are You Sure?</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">Warning:</Card.Subtitle>
                    <Card.Text>
                      Changes made to this community will be visible to all members and may affect the community's overall experience.
                      Please review your changes before submitting.
                    </Card.Text>
                    <Card.Link href={`/r/${id}/edit`} className='btn btn-danger'>Edit Community</Card.Link>
                  </Card.Body>
                </Card>
              </Tab.Pane>
              <Tab.Pane eventKey="third">
                <Card>
                  <Card.Header className='text-center'>
                    <h4>Help Center</h4>
                  </Card.Header>
                  <Card.Body>
                    <Card.Title>FAQ</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">Warning:</Card.Subtitle>

                    <ListGroup variant="flush">
                      <ListGroup.Item>My account has been locked as a security precaution</ListGroup.Item>
                      <ListGroup.Item>Can I change my username?</ListGroup.Item>
                      <ListGroup.Item>Recovering a lost or forgotten username</ListGroup.Item>
                      <ListGroup.Item>How do I log in to Reddit if I forgot my password?</ListGroup.Item>
                      <ListGroup.Item>What is karma?</ListGroup.Item>
                      <ListGroup.Item>What is two-factor authentication and how do I set it up?</ListGroup.Item>

                    </ListGroup>
                  </Card.Body>
                </Card>
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </div>
  )
}

export default Modrator
