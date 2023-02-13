import React, { useState } from 'react'
import { FaPlus } from 'react-icons/fa'
import '../../css/post.css'
import '../../css/warning.css'

const ContentWarning = () => {
  const [warning, setWarning] = useState('')

  const onChange = (event) => {
    console.log(event)
    setWarning(event.name)
  }

  return (
    <div>
      <div className="form-group">
        <ul className="mt-4 pt-2 d-flex gap-2 warning-nav-link">
          <li className={warning==='oc' && 'active'} id="oc_warning" onClick={onChange}><i className='me-2'><FaPlus /></i>
            <input type="checkbox" id="oc" name='oc' className="d-none btn-check" />
            OC
          </li>
          <li className={warning==='spoiler' && 'active'} id="spoiler_warning" onClick={onChange}><i className=' me-2'><FaPlus /></i>
            <input type="checkbox" id="Spoiler" name='spoiler' className="d-none btn-check" />
            Spoiler
          </li>
          <li className={warning==='nsfw' && 'active'} id="nsfw_warning" onClick={onChange}><i className=' me-2'><FaPlus /></i>
            <input type="checkbox" id="NSFW" name='nsfw' className="d-none btn-check" />
            NSFW
          </li>
          <li className=" text-disabled" id="nsfw_warning"><i className=' me-2'><FaPlus /></i>
            Flair
          </li>
        </ul>
        <hr className='ms-4 me-4' />
      </div>
    </div>
  )
}

export default ContentWarning
