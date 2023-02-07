import React from 'react'
import { FaRocket, FaFire, FaTag, FaPoll } from 'react-icons/fa'
import '../../css/Tab.css'
import Best from './Tabs/Best';
import Hot from './Tabs/Hot';
import New from './Tabs/New';
import Top from './Tabs/Top';

import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
const Tab_List = ({ posts }) => {
  return (
    <div>
      <div className="pl-3 pr-3 mb-3">
        <div className="row">
          <div className="col-12">
            <Tabs
              defaultActiveKey="best"
              id="justify-tab-example"
              className="card d-flex flex-row mb-3"
              justify
            >
              {/*JUST DESC ORDER */}
              {posts && posts.posts && <Tab eventKey="best" title={<span>{<FaRocket />} Best</span>} tabClassName="post-tab-nav-link"> <Best posts={posts.posts} /> </Tab>}
               {/* ACCORDING TO UPVOTES  */}
              {posts && posts.hot_posts && <Tab eventKey="hot" title={<span>{<FaFire />} Hot</span>} tabClassName="post-tab-nav-link"> <Hot posts={posts.hot_posts} /> </Tab>}
               {/* CREATION TIME  */}
              {posts && posts.new_posts && <Tab eventKey="new" title={<span>{<FaTag />} New</span>} tabClassName="post-tab-nav-link"> <New posts={posts.new_posts} /></Tab>}
              {/* VIEW COUNT */}
              {posts && posts.top_posts && <Tab eventKey="top" title={<span>{<FaPoll />} Top</span>} tabClassName="post-tab-nav-link"> <Top posts={posts.top_posts} /> </Tab>}
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Tab_List
