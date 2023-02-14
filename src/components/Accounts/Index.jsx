import React, { useState, useEffect } from 'react';
import { Tab, Tabs, Nav, NavItem } from 'react-bootstrap';
import Posts from './posts';
import Comments from './Comments';
import Saved from './Saved';
import Upvotes from './Upvotes';
import Downvotes from './DownVotes';
import Right_Profile_Tab from './ProfileRightTab';
import '../../css/Account.css';
import BackToTop from '../Home/Tabs/Bactotop';

const Index = () => {

  return (
    <div className=''>
      <div className="row">
        <div className="col-9 right-profile-nav">
          <Tabs defaultActiveKey="overview" id="profile-nav">
            <Tab eventKey="overview" title="OVERVIEW">
              <Posts />
            </Tab>
            <Tab eventKey="posts" title="POSTS">
              <Posts />
            </Tab>
            <Tab eventKey="comments" title="COMMENTS">
              <Comments />
            </Tab>
            <Tab eventKey="history" title="HISTORY">
              <Posts />
            </Tab>
            <Tab eventKey="saved" title="SAVED">
              <Saved />
            </Tab>
            <Tab eventKey="upvotes" title="UPVOTED">
              <Upvotes />
            </Tab>
            <Tab eventKey="downvotes" title="DOWNVOTED">
              <Downvotes />
            </Tab>
          </Tabs>
        </div>
          <div className="col-4 right-profile-tab">
            <Right_Profile_Tab />
          </div>
<BackToTop/>
      </div>
    </div>
  );
};

export default Index;
