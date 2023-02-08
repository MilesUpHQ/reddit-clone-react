import React, { useEffect, useState } from 'react'
import Create_Post from './Create_Post';
import Right_Tab from './Right_Tab';
import { FaRocket, FaFire, FaTag, FaPoll } from 'react-icons/fa'
import '../../css/Tab.css'
import Best from './Tabs/Best';
import Hot from './Tabs/Hot';
import New from './Tabs/New';
import Top from './Tabs/Top';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import '../../css/Community.css'
import PostApi from './PostApi';

const Home = () => {
  const { get_all_posts, get_best_posts, get_hot_posts, get_new_posts, get_top_posts } = PostApi();
  const [posts, setPosts] = useState();
  const [activeTab, setActiveTab] = useState("best");

  useEffect(() => {
    switch (activeTab) {
      case "best":
        get_best_posts().then((best_posts) => {
          setPosts({ best_posts });
        });
        break;
      case "hot":
        get_hot_posts().then((hot_posts) => {
          setPosts({ hot_posts });
        });
        break;
      case "new":
        get_new_posts().then((new_posts) => {
          setPosts({ new_posts });
        });
        break;
      case "top":
        get_top_posts().then((top_posts) => {
          setPosts({ top_posts });
        });
        break;
      default:
        break;
    }
  }, [activeTab]);


  return (
    <div className="community_post">
      <div className="row">
        <div className="col-8 mr-auto">
          < Create_Post />
          <div>
            <div className="pl-3 pr-3 mb-3">
              <div className="row">
                <div className="col-12">
                  <Tabs
                    activeKey={activeTab}
                    onSelect={(key) => setActiveTab(key)}
                    id="justify-tab-example"
                    className="card d-flex flex-row mb-3"
                    justify
                  >
                    {posts && (
                      <Tab eventKey="best" title={<span>{<FaRocket />} Best</span>} tabClassName="post-tab-nav-link">
                        <Best posts={posts.best_posts} />
                      </Tab>
                    )}
                    {posts && (
                      <Tab eventKey="hot" title={<span>{<FaFire />} Hot</span>} tabClassName="post-tab-nav-link">
                        <Hot posts={posts.hot_posts} />
                      </Tab>
                    )}
                    {posts && (
                      <Tab eventKey="new" title={<span>{<FaTag />} New</span>} tabClassName="post-tab-nav-link">
                        <New posts={posts.new_posts} />
                      </Tab>
                    )}
                    {posts && (
                      <Tab eventKey="top" title={<span>{<FaPoll />} Top</span>} tabClassName="post-tab-nav-link">
                        <Top posts={posts.top_posts} />
                      </Tab>
                    )}
                  </Tabs>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='col-4 mr-auto'> <Right_Tab /> </div>
      </div>
    </div>
  )
}

export default Home
