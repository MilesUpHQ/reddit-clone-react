import React from 'react'
import JsonData from '../../data/data.json'
import DiscussionForm from './DiscussionForm'
import ImageForm from './ImageForm'
import LinkForm from './LinkForm'
import PollForm from './PollForm'
import '../../css/post.css'
import '../../css/tab.css'
import { CgNotes, CgImage, CgLink } from 'react-icons/cg'
import { BiPoll } from 'react-icons/bi'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Signup from '../Form/Signup'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Postform = () => {
  const navigate = useNavigate();
  const account = JSON.parse(localStorage.getItem('account'))

  return (

    <div>
      {account ? [
        <div className="card rounded mb-3">
          <div className="row">
            <div className="col-12">
              <div className="">
                <Tabs
                  defaultActiveKey="post"
                  id="justify-tab-example"
                  className="mb-3"
                  justify
                >
                  <Tab eventKey="post" title={<span>{<CgNotes />} Post</span>} tabClassName="post-tab-nav-link">
                    <DiscussionForm />
                  </Tab>
                  <Tab eventKey="image" title={<span>{<CgImage />} Images</span>} tabClassName="post-tab-nav-link">
                    <ImageForm />
                  </Tab>
                  <Tab eventKey="link" title={<span>{<CgLink />} Link</span>} tabClassName="post-tab-nav-link">
                    <LinkForm />
                  </Tab>
                  <Tab eventKey="poll" title={<span>{<BiPoll />} Poll</span>} tabClassName="post-tab-nav-link">
                    <PollForm />
                  </Tab>
                </Tabs>
              </div>
            </div>
          </div>
        </div>
      ] : [
        toast.error("You must Login!"),
        window.location.href = '/signin'
      ]}
    </div>
  )
}

export default Postform
