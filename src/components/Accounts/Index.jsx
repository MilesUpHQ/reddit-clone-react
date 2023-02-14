import React, { useState, useEffect } from 'react';
import { Tab, Tabs, Nav, NavItem } from 'react-bootstrap';
import Posts from './posts';
import Comments from './Comments';
import Saved from './Saved';
import Upvotes from './Upvotes';
import Downvotes from './DownVotes';
import Right_Profile_Tab from './ProfileRightTab';
import '../../css/Account.css';

const Index = () => {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    document.addEventListener("scroll", () => {
      setShowButton(window.scrollY > 200);
    });
  }, []);

  const handleClick = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

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
        <div className="col-3 right-profile-tab">
          <Right_Profile_Tab />
        </div>
        {showButton && (
          <button className="btn-backtotop" style={{ position: 'fixed', width: '160px', bottom: '20px', right: '20px', left: '1200px' }} onClick={handleClick}>
            Back to Top
          </button>
        )}
      </div>
    </div>
  );
};

export default Index;
