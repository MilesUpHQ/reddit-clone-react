import React from 'react'
import DiscussionForm from './DiscussionForm'
import ImageForm from './ImageForm'
import LinkForm from './LinkForm'
import PollForm from './PollForm'
import '../../css/post.css'
import '../../css/tab.css'
import {FaRocket, FaFire, FaTag, FaChartBar} from 'react-icons/fa'

const Postform = () => {
    return (
        <div>
          <div className = "card rounded mb-3">
            <div className = "row">
              <div className = "col-12">
                <div className = "">
                  <ul className = "nav">
                    <li className = "post-tab-nav-link flex-fill"><a data-toggle="tab" href="#posts_form"><i
                        className = 'mr-2'><FaRocket /></i> Posts</a></li>
                    <li className = "post-tab-nav-link flex-fill"><a data-toggle="tab" href="#images_form"><i
                        className = 'mr-2'><FaFire /></i> Images & Video</a></li>
                    <li className = "post-tab-nav-link flex-fill"><a data-toggle="tab" href="#link_form"><i 
                        className = 'mr-2'><FaTag /></i>Link</a></li>
                    <li className = "post-tab-nav-link flex-fill "><a data-toggle="tab" href="#poll_form"><i
                        className = 'mr-2'><FaChartBar /></i> Poll</a></li>
                  </ul>
                </div>
              </div>
            </div>
          <div className = "tab-content">
            <div id="posts_form" className = "tab-pane fade-in infinity active">
              <DiscussionForm />
            </div>
            <div id="images_form" className = "tab-pane fade infinity">
              <ImageForm />
            </div>
            <div id="link_form" className = "tab-pane fade infinity">
              <LinkForm />
            </div>
            <div id="poll_form" className = "tab-pane fade infinity">
              <PollForm />
            </div>
          </div>
        </div>
        </div>
    )
}

export default Postform
