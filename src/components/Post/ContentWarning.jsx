import React from 'react'
import {FaPlus} from 'react-icons/fa'
import '../../css/post.css'
import '../../css/warning.css'

const ContentWarning = () => {
    return (
        <div>
          <div className = "create-post m-3">
            <div className = "form-group">
              <ul className = "ml-4 mr-4 pb-3 mt-5 border-bottom">
                <li className = "warning-nav-link" id="oc_warning"><i className = ' mr-1'><FaPlus /></i>
                  <input type = "checkbox" id = "oc" className= "d-none btn-check" />
                  OC
                </li>
                <li className = "warning-nav-link" id="spoiler_warning"><i className = ' mr-1'><FaPlus /></i>
                  <input type = "checkbox" id = "Spoiler" className   = "d-none btn-check" /> 
                  Spoiler
                </li>
                <li className = "warning-nav-link" id="nsfw_warning"><i className = ' mr-1'><FaPlus /></i>
                  <input type = "checkbox" id = "NSFW" className   = "d-none btn-check" />
                  NSFW
                </li>
                  <li className = "warning-nav-link text-disabled" id="nsfw_warning"><i className = ' mr-1'><FaPlus /></i>
                   Flair
                </li>
               </ul>
            </div>
          </div>
        </div>
    )
}

export default ContentWarning
