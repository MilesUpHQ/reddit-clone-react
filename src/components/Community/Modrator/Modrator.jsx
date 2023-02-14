import React from 'react'
import BannedUserList from './BannedUserList'
import ToolPage from './ToolPage'
import BannedUsers from './BannedUsers'
import '../../../css/Community.css'

import { Card, Col, ListGroup, Nav, Row, Tab } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { FaRegUser } from 'react-icons/fa';
import { AiOutlineTag } from 'react-icons/ai';
import { MdOutlineFormatListBulleted } from 'react-icons/md';
import { CiSettings } from 'react-icons/ci';
import { MdOutlineMailOutline } from 'react-icons/md';
import { BiBarChartAlt } from 'react-icons/bi';
import { AiOutlineQuestionCircle } from 'react-icons/ai';
import { RiFileListLine } from 'react-icons/ri';
import { RiFileShieldLine } from 'react-icons/ri';
import { AiOutlineInfoCircle } from 'react-icons/ai';
// import { HiOutlineArrowTopRightOnSquare } from 'react-icons/hi';


const Modrator = () => {
  const { id } = useParams();

  return (
    <div className=''>
      <div className=''></div>
      <div className='sidebar'>
        <nav className="bg-light side-nav">
          <div className="sidebar-sticky">
            <ul className="nav flex-column">
              <div className=" ms-3 text-muted mb-1"><span className='tools'><RiFileShieldLine /></span><span className='mod-nav'>QUEUES</span></div>
              <li className="nav-item"><a href="#mod-queue">Mod queue</a></li>
              <a href="#"><li className="nav-item">Reports</li></a>
              <a href="#"><li className="nav-item">Spam</li></a>
              <a href="#"><li className="nav-item">Edited</li></a>
              <a href="#"><li className="nav-item">Unmoderated</li></a>

              <div className=" ms-3 text-muted mb-1 mt-3"><span className='tools'><FaRegUser /></span><span className='mod-nav'> USER MANAGEMENT</span></div>
              <a href="#"><li className="nav-item">Banned</li></a>
              <a href="#"><li className="nav-item">Muted</li></a>
              <a href="#"><li className="nav-item">Approved</li></a>
              <a href="#"><li className="nav-item">Talk hosts</li></a>
              <a href="#"><li className="nav-item">Moderators</li></a>

              <div className=" ms-3 text-muted mb-1 mt-3"><span className='tools mt-2'><AiOutlineTag /></span><span className='mod-nav'> FLAIR & EMOJIS</span></div>
              <a href="#"><li className="nav-item">Grant user flair</li></a>
              <a href="#"><li className="nav-item">Emojis</li></a>
              <a href="#"><li className="nav-item">User flair</li></a>
              <a href="#"><li className="nav-item">Post flair</li></a>

              <div className=" ms-3 text-muted mb-1 mt-3"><span className='tools'><RiFileListLine /></span><span className='mod-nav'> RULES AND REGULATIONS</span></div>
              <a href="#"><li className="nav-item">Rules</li></a>
              <a href="#"><li className="nav-item">Removal reasons</li></a>
              <a href="#"><li className="nav-item">Content controls</li></a>
              <a href="#"><li className="nav-item">Automod</li></a>

              <div className=" ms-3 text-muted mb-1 mt-3"><span className='tools'><MdOutlineFormatListBulleted /></span><span className='mod-nav'> CONTENT</span></div>
              <a href="#"><li className="nav-item">Scheduled posts</li></a>

              <div className=" ms-3 text-muted mb-1 mt-3"><span className='tools'><CiSettings /></span><span className='mod-nav'> OTHER</span></div>
              <a href="#"><li className="nav-item">Awards</li></a>
              <a href="#"><li className="nav-item">Wiki pages</li></a>
              <a href="#"><li className="nav-item">Community settings</li></a>
              <a href="#"><li className="nav-item">Community appearance</li></a>

              <div className=" ms-3 text-muted mb-1 mt-3"><span className='tools'><MdOutlineMailOutline /></span><span className='mod-nav'> MOD MAIL</span></div>
              <a href="#"><li className="nav-item">Modmail</li></a>

              <div className=" ms-3 text-muted mb-1 mt-3"><span className='tools'><BiBarChartAlt /></span><span className='mod-nav'> COMMUNITY ACTIVITY</span></div>
              <a href="#"><li className="nav-item">Traffic stats</li></a>
              <a href="#"><li className="nav-item">Mod log</li></a>

              <div className=" ms-3 text-muted mb-1 mt-3"><span className='tools'><AiOutlineQuestionCircle /></span><span className='mod-nav'> MOD HELP CENTER</span></div>
              <a href="#"><li className="nav-item">Mod help center</li></a>
              <a href="#"><li className="nav-item">Moderator code of conduct</li></a>
              <a href="#"><li className="nav-item">r/ModSupport</li></a>
              <a href="#"><li className="nav-item">r/ModHelp</li></a>
              <a href="#"><li className="nav-item">Contact Reddit</li></a>
            </ul>
          </div>
        </nav>
        <div className='mt-3 mb-5'>
          <div class="tab-content">
            <div id="mod-queue" class="tab-pane">
            <h5>Mod Queue <AiOutlineInfoCircle /></h5>
              <ToolPage />
            </div>
          </div>
        </div>
      </div>
      <Tab.Container id="left-tabs-example" defaultActiveKey="first">
        <Row>
          {/* <Col sm={3}>
            <Nav variant="pills" className="card p-0 flex-column">
              <Nav.Item>
                <Nav.Link disabled eventKey="" className='mod-nav-link text-center bg-secondary text-white'>User Management</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="first" className='mod-nav-link'>Banned Users</Nav.Link>
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
          </Col> */}
          <Col sm={8}>
            <Tab.Content>
              <Tab.Pane eventKey="first">
                <Row>
                  <Col sm={9}>
                    <BannedUserList />
                  </Col>
                  <Col sm={3}>
                    {/* <BannedUsers /> */}
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
