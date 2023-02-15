import React, { useEffect, useState } from 'react'
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
import { toast } from 'react-toastify';
import PostApi from '../Home/PostApi'
import Select from 'react-select'
import HandlePostForm from './HandlePostForm'

const Postform = () => {
  const { fetchJoinedCommunity } = PostApi()
  const { onSelectCommunity,
          onChange,
          handleChange,
          onSubmit,
          selectedCommunity,
        } = HandlePostForm()

  const account = JSON.parse(localStorage.getItem('account'))
  const [communityOptions, setCommunityOptions] = useState([])

  useEffect(() => {
    let mounted = true;
    fetchJoinedCommunity().then((items) => {
      if (mounted) {
        let options = []
        options = options.concat(items.map(option =>
          ({ value: option.id, label: `r/${option.name}` })))
        setCommunityOptions(options)
      }
    });
    return () => (mounted = false);
  }, []);

  return (

    <div>
      {account ? [
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
                    className="post-new-tab mb-3"
                    justify
                  >
                    <Tab eventKey="post" title={<span>{<CgNotes />} Post</span>} tabClassName="post-tab-nav-link">
                      <DiscussionForm onChange={onChange} handleChange={handleChange} onSubmit={onSubmit} />
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
