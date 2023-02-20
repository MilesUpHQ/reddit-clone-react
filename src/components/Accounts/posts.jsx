
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
    const fetchPosts = (endpoint, setPosts) => {
      axios.get(`http://localhost:3000/api/v1/communities/${community_id}/posts/${id}/${endpoint}_posts?page=${page}&limit=${limit}`)
        .then(response => {
          console.log(response.data[`${endpoint}_posts`])
          setPosts(prevPosts => [...prevPosts, ...response.data[`${endpoint}_posts`]]);
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
    };

    switch (activeTab) {
      case "hot":
        fetchPosts('hot', sethotPosts);
        break;
      case "new":
        fetchPosts('new', setnewPosts);
        break;
      case "top":
        fetchPosts('top', settopPosts);
        break;
      default:
        break;
    }
  }, [hasMore, page, activeTab, community_id, id])

  function createTab(eventKey, icon, title, component) {
    const iconStyle = {
      fontSize: '20px',
    };

    const titleStyle = {
      display: 'flex',
      alignItems: 'center',
    };

    return (
      <Tab
        key={eventKey}
        eventKey={eventKey}
        title={
          <span style={titleStyle}>
            <span style={iconStyle}>{icon}</span> {title}
          </span>
        }
        tabClassName="tab-nav-link"
      >
        {component}
      </Tab>
    );
  }

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
                    {posts && createTab('hot', <FaFire />, 'Hot', <Hot posts={hotposts.filter(hotpost => hotpost.account_id === account.id)} profilePage={true} />)}
                    {posts && createTab('new', <FaSun />, 'New', <New posts={newposts.filter(newpost => newpost.account_id === account.id)} profilePage={true} />)}
                    {posts && createTab('top', <FaPoll />, 'Top', <Top posts={topposts.filter(toppost => toppost.account_id === account.id)} profilePage={true} />)}
                  </Tabs>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div >
  )
}

export default Posts;