import React, { useEffect, useState } from 'react'
import CreatePost from './CreatePost';
import RightTab from './RightTab';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { FaFire, FaPoll, FaSun } from 'react-icons/fa'
import { IoMdRocket } from 'react-icons/io'
import Best from './Tabs/Best';
import Hot from './Tabs/Hot';
import New from './Tabs/New';
import Top from './Tabs/Top';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import '../../css/Community.css'
import { HiDotsHorizontal } from 'react-icons/hi';
import { RiLayoutRowLine } from 'react-icons/ri'

import BackToTop from './Tabs/BackToTop';
const Home = () => {
  const [posts, setPosts] = useState([]);
  const [bestposts, setbestPosts] = useState([]);
  const [topposts, settopPosts] = useState([]);
  const [hotposts, sethotPosts] = useState([]);
  const [newposts, setnewPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [activeTab, setActiveTab] = useState("best");
  const limit = 15;
  let { id, community_id } = useParams();
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
      case "best":
        fetchPosts('best', setbestPosts);
        break;
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
  }, [hasMore, page, activeTab, community_id, id]);

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
    <div className="community_post">
      <div className="row">
        <div className="col-8 mr-auto">
          < CreatePost />
          <div>
            <div className="pl-3 pr-3 mb-3">
              <div className="row">
                <div className="col-12">
                  <Tabs
                    activeKey={activeTab}
                    onSelect={(key) => setActiveTab(key)}
                    className="card categories p-2 d-flex flex-row mb-3"
                  >
                    {posts && createTab('best', <IoMdRocket />, 'Best', <Best posts={bestposts} />)}
                    {posts && createTab('hot', <FaFire />, 'Hot', <Hot posts={hotposts} />)}
                    {posts && createTab('new', <FaSun />, 'New', <New posts={newposts} />)}
                    {posts && createTab('top', <FaPoll />, 'Top', <Top posts={topposts} />)}
                    {posts && createTab('dots', <HiDotsHorizontal />, '', null)}
                    {posts && createTab('grid', <RiLayoutRowLine />, '', null)}
                  </Tabs>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='col-4 mr-auto'> <RightTab /> </div>
      </div>
      <BackToTop />
    </div>
  )
}

export default Home
