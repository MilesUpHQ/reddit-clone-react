import React, { useEffect, useState } from 'react'
import Create_Post from './Create_Post';
import Right_Tab from './Right_Tab';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { FaFire, FaPoll, FaSun } from 'react-icons/fa'
import { IoMdRocket } from 'react-icons/io'
import { CiSun } from 'react-icons/ci'
import Best from './Tabs/Best';
import Hot from './Tabs/Hot';
import New from './Tabs/New';
import Top from './Tabs/Top';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import '../../css/Community.css'
import { Dropdown, DropdownButton } from "react-bootstrap";
import { HiDotsHorizontal, HiTrendingUp } from 'react-icons/hi';
import { RiLayoutRowLine } from 'react-icons/ri'

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
  const limit = 15
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
                    className="card categories p-2 d-flex flex-row mb-3"
                  >
                    {posts && (
                      <Tab eventKey="best" title={<span>
                        <span style={{ fontSize: '20px' }}><IoMdRocket /></span> Best
                      </span>} tabClassName="tab-nav-link">
                        <Best posts={bestposts} />
                      </Tab>
                    )}
                    {posts && (
                      <Tab eventKey="hot" title={<span>
                        <span style={{ fontSize: '20px' }}><FaFire /></span> Hot
                      </span>} tabClassName="tab-nav-link">
                        <Hot posts={hotposts} />
                      </Tab>
                    )}
                    {posts && (
                      <Tab eventKey="new" title={<span>
                        <span style={{ fontSize: '20px' }}><FaSun /></span> New
                      </span>} tabClassName="tab-nav-link">
                        <New posts={newposts} />
                      </Tab>
                    )}
                    {posts && (
                      <Tab eventKey="top" title={<span>
                      <span style={{ fontSize: '20px' }}><FaPoll /></span> Top
                    </span>} tabClassName="tab-nav-link">
                        <Top posts={topposts} />
                      </Tab>
                    )}
                    {posts && (
                      <Tab title={<span>
                      <span style={{ fontSize: '20px' }}>{<HiDotsHorizontal />}</span> 
                    </span>} tabClassName="tab-nav-link">
                      </Tab>
                    )}
                    {posts && (
                      <Tab title={<span>
                      <span style={{ fontSize: '25px' }}>{<RiLayoutRowLine />}</span> 
                    </span>} tabClassName="grid">
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
