
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { FaFire, FaPoll, FaSun } from 'react-icons/fa'
import Hot from '../Home/Tabs/Hot';
import New from '../Home/Tabs/New';
import Top from '../Home/Tabs/Top';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import '../../css/Community.css'


const Posts = () => {
  const account = JSON.parse(localStorage.getItem('account'));
  const [posts, setPosts] = useState([]);
  const [topposts, settopPosts] = useState([]);
  const [hotposts, sethotPosts] = useState([]);
  const [newposts, setnewPosts] = useState([]);
  const [page, setPage] = useState(1);
  let { id, community_id } = useParams();
  const [hasMore, setHasMore] = useState(true);
  const [activeTab, setActiveTab] = useState("hot");
  const limit = 15;
  useEffect(() => {
    switch (activeTab) {
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
    <div className="community_post-profile-posts">
      <div className="row">
        <div className="col-8 mr-auto">
          <div>
            <div className="pl-3 pr-3 mb-3">
              <div className="row">
                <div className="col-12">
                  <Tabs
                    activeKey={activeTab}
                    onSelect={(key) => setActiveTab(key)}
                    className="card categories p-2 d-flex flex-row mb-3"
                  >
                    {posts && (
                      <Tab eventKey="hot" title={<span>
                        <span style={{ fontSize: '20px' }}><FaFire /></span> Hot
                      </span>} tabClassName="tab-nav-link">
                        <Hot posts={hotposts.filter(hotpost => hotpost.account_id === account.id)} profilePage={true} />
                      </Tab>
                    )}
                    {posts && (
                      <Tab eventKey="new" title={<span>
                        <span style={{ fontSize: '20px' }}><FaSun /></span> New
                      </span>} tabClassName="tab-nav-link">
                        <New posts={newposts.filter(newpost => newpost.account_id === account.id)} profilePage={true} />
                      </Tab>
                    )}
                    {posts && (
                      <Tab eventKey="top" title={<span>
                        <span style={{ fontSize: '20px' }}><FaPoll /></span> Top
                      </span>} tabClassName="tab-nav-link">
                        <Top posts={topposts.filter(toppost => toppost.account_id === account.id)} profilePage={true} />
                      </Tab>
                    )}
                  </Tabs>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Posts;