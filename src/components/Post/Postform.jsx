import React, { useEffect, useState } from 'react'
import JsonData from '../../data/data.json'
import DiscussionForm from './DiscussionForm'
import ImageForm from './ImageForm'
import LinkForm from './LinkForm'
import PollForm from './PollForm'
import '../../css/post.css'
import '../../css/tab.css'
import { CgNotes, CgImage, CgLink } from 'react-icons/cg'
import { BiPoll } from 'react-icons/bi'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Signup from '../Form/Signup'
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios'
import PostApi from '../Home/PostApi'
import { Dropdown, Form, FormCheck } from 'react-bootstrap'
import { AiFillHome } from 'react-icons/ai'
import { RiArrowDropDownLine } from 'react-icons/ri'
import { MDBSelect } from 'mdb-react-ui-kit';
import { TbCircleDotted } from 'react-icons/tb'
import Select from 'react-select'

const Postform = () => {
  const { post, setPost } = PostApi()

  const navigate = useNavigate();
  const account = JSON.parse(localStorage.getItem('account'))
  const [subscriptions, setSubscriptions] = useState([]);
  const fetchData = async () => {
    return await axios.get(`http://localhost:3000/api/v1/banned_users?account_id=${account.id}`)
      .then((response) => response.data)
      .catch((error) => {
        console.log(error)
      })
  };

  useEffect(() => {
    let mounted = true;
    fetchData().then((items) => {
      if (mounted) {
        let options = []
        options = options.concat(items.map(option =>
          ({ value: option.id, label: `r/${option.name}` })))
        setCommunityOptions(options)
        setSubscriptions(items)
      }
    });
    return () => (mounted = false);
  }, []);

  const [communityOptions, setCommunityOptions] = useState([])
  const [selectedCommunity, setSelectedCommunity] = useState([])

  const onSelectCommunity = (event) => {
    setSelectedCommunity(event)
    setPost({
      ...post,
      'community_id': event.value
    });
  }

  return (

    <div>
      {account ? [
        console.log(subscriptions),
        <div className="">
          <div className="row mt-3">
            <div className="col-sm-5">
              <div className="card rounded mb-3">
                <div className="form-group">
                  <Select
                    options={communityOptions}
                    value={selectedCommunity}
                    onChange={onSelectCommunity}
                    placeholder="Choose a community"
                    styles={{
                      control: (base) => ({
                        ...base,
                        padding: "5px",
                        borderColor: "#ccc"
                      })
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="card rounded mb-3">
            <div className="row">
            </div>
            <div className="row">
              <div className="col-12">
                <div className="">
                  <Tabs
                    defaultActiveKey="post"
                    id="justify-tab-example"
                    className="mb-3"
                    justify
                  >
                    <Tab eventKey="post" title={<span>{<CgNotes />} Post</span>} tabClassName="post-tab-nav-link">
                      <DiscussionForm />
                    </Tab>
                    <Tab eventKey="image" title={<span>{<CgImage />} Images</span>} tabClassName="post-tab-nav-link">
                      <ImageForm />
                    </Tab>
                    <Tab eventKey="link" title={<span>{<CgLink />} Link</span>} tabClassName="post-tab-nav-link">
                      <LinkForm />
                    </Tab>
                    <Tab eventKey="poll" title={<span>{<BiPoll />} Poll</span>} tabClassName="post-tab-nav-link">
                      <PollForm />
                    </Tab>
                  </Tabs>
                </div>
              </div>
            </div>
          </div>
        </div>
      ] : [
        toast.error("You must Login!"),
        window.location.href = '/signin'
      ]}
    </div>
  )
}

export default Postform
