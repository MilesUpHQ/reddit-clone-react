import React, { useEffect, useState } from 'react'
import Create_Post from './Create_Post';
import Right_Tab from './Right_Tab';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { FaRocket, FaFire, FaTag, FaPoll } from 'react-icons/fa'
import '../../css/Tab.css'
import Best from './Tabs/Best';
import Hot from './Tabs/Hot';
import New from './Tabs/New';
import Top from './Tabs/Top';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import '../../css/Community.css'

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [bestposts, setbestPosts] = useState([]);
  const [topposts, settopPosts] = useState([]);
  const [hotposts, sethotPosts] = useState([]);
  const [newposts, setnewPosts] = useState([]);

  const [page, setPage] = useState(1);
  let { id, community_id } = useParams();
  const [hasMore, setHasMore] = useState(true);
  const [activeTab, setActiveTab] = useState("best");
  const limit = 15;
  useEffect(() => {
    switch (activeTab) {
      case "best":
        axios.get(`http://localhost:3000/api/v1/communities/${community_id}/posts/${id}/best_posts?page=${page}&limit=${limit}`)
          .then(response => {
            console.log(response.data.best_posts)
            setbestPosts([...bestposts, ...response.data.best_posts]);
            setHasMore(response.data.total_pages > page);
          })
          .catch(error => {
            console.error(error);
          });
        window.onscroll = () => {
          if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight && hasMore) {
            setPage(prevPage => prevPage + 1);
          }
        };

      case "hot":
        axios.get(`http://localhost:3000/api/v1/communities/${community_id}/posts/${id}/hot_posts?page=${page}&limit=${limit}`)
          .then(response => {
            console.log(response.data.hot_posts)
            sethotPosts([...hotposts, ...response.data.hot_posts]);
            setHasMore(response.data.total_pages > page);
          })
          .catch(error => {
            console.error(error);
          });
        window.onscroll = () => {
          if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight && hasMore) {
            setPage(prevPage => prevPage + 1);
          }
        };

        break;
      case "new":
        axios.get(`http://localhost:3000/api/v1/communities/${community_id}/posts/${id}/new_posts?page=${page}&limit=${limit}`)
          .then(response => {
            console.log(response.data.new_posts)
            setnewPosts([...newposts, ...response.data.new_posts]);
            setHasMore(response.data.total_pages > page);
          })
          .catch(error => {
            console.error(error);
          });
        window.onscroll = () => {
          if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight && hasMore) {
            setPage(prevPage => prevPage + 1);
          }
        };
        break;
      case "top":
        axios.get(`http://localhost:3000/api/v1/communities/${community_id}/posts/${id}/top_posts?page=${page}&limit=${limit}`)
          .then(response => {
            console.log(response.data.top_posts)
            settopPosts([...topposts, ...response.data.top_posts]);
            setHasMore(response.data.total_pages > page);
          })
          .catch(error => {
            console.error(error);
          });
        window.onscroll = () => {
          if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight && hasMore) {
            setPage(prevPage => prevPage + 1);
          }
        };
      default:
        break;
    }
  }, [hasMore, page, activeTab]);

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
                        <Best posts={bestposts} />
                      </Tab>
                    )}
                    {posts && (
                      <Tab eventKey="hot" title={<span>{<FaFire />} Hot</span>} tabClassName="post-tab-nav-link">
                        <Hot posts={hotposts} />
                      </Tab>
                    )}
                    {posts && (
                      <Tab eventKey="new" title={<span>{<FaTag />} New</span>} tabClassName="post-tab-nav-link">
                        <New posts={newposts} />
                      </Tab>
                    )}
                    {posts && (
                      <Tab eventKey="top" title={<span>{<FaPoll />} Top</span>} tabClassName="post-tab-nav-link">
                        <Top posts={topposts} />
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
