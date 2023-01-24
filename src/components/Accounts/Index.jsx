import React from 'react'
import { FaRocket, FaFire, FaBookmark } from 'react-icons/fa'
import Posts from './posts';
import Comments from './Comments';
import Saved from './Saved';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import '../../css/Account.css';


const Index = () => {
  return (
    <div className="community_post">
      <div className="row">
        <div className="col-sm-7">
          <Tabs
            defaultActiveKey="posts"
            id="justify-tab-example"
            className="mb-3"
            justify
          >
            <Tab eventKey="posts" title={<span>{<FaRocket />} POSTS</span>} tabClassName="post-tab-nav-link"><Posts />  </Tab>
            <Tab eventKey="comments" title={<span>{<FaFire />} COMMENTS</span>} tabClassName="post-tab-nav-link"> <Comments /> </Tab>
            <Tab eventKey="saved" title={<span>{<FaBookmark />} SAVED</span>} tabClassName="post-tab-nav-link"><Saved /> </Tab>
          </Tabs>
          <div className="infinite-scrolling">
          </div>
        </div>
        <div className="col-sm-4">
          <div className="card p-2">
            <div className="row">
              <div className="col-2">
                <p className="premium-logo"><i className='fa fa-shield'></i></p>
              </div>
              <div className="col-10">
                <p className="premium-head mb-1">Reddit Premium</p>
                <p className="premium-des">The best Reddit experience, with monthly Coins</p>
              </div>
            </div>
            <div className="premium-join">
            </div>
          </div>
          <div className="card mt-3">
            <div className="d-flex">
              <p className="mt-3 pl-1">Home</p>
            </div>
            <div className="ml-3 mt-0">
              <p className="">Your personal Reddit frontpage. Come here to check in with your favorite communities.</p>
            </div>
          </div>
        </div>
      </div>
    </div>)
}

export default Index
