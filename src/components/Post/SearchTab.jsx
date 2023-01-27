import React from 'react'
import PostResults from './PostResults'
import CommentResults from './CommentResults'
import CommunityResults from './CommunityResults'
import PeopleResults from './PeopleResults'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { CgNotes, CgComment, CgCommunity } from 'react-icons/cg'
import { BsFillPeopleFill } from 'react-icons/bs'

function SearchTab() {
  return (
    <div>
      <div class="card">
        <div class="card p-2 pl-3 pr-3">
          <div class="row">
            <div class="col-8 p-2">
              <Tabs
                id="justify-tab-example"
                className="mb-3"
                justify>
                <Tab eventKey="post" title={<span>{<CgNotes />} Posts</span>} tabClassName="tab-nav-link">
                    <PostResults />
                </Tab>
                <Tab eventKey="comment" title={<span>{<CgComment />} Comments</span>} tabClassName="tab-nav-link">
                   <CommentResults />
                </Tab>
                <Tab eventKey="community" title={<span>{<CgCommunity />} Community</span>} tabClassName="tab-nav-link">
                    <CommunityResults />
                </Tab>
                <Tab eventKey="people" title={<span>{<BsFillPeopleFill />} People </span>} tabClassName="tab-nav-link">
                    <PeopleResults />
                </Tab>
              </Tabs>
              
            </div>
          </div>
        </div>
    </div>
   </div>
  )
}

export default SearchTab
