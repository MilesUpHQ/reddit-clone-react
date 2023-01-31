import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { confirmAlert } from 'react-confirm-alert';
import { FaEdit, FaTrash, FaTimes, FaComment, FaFlag } from 'react-icons/fa';
import EditPost from '../../components/Post/Form/EditPost';
import ReportForm from './ReportForm'


function delete_post(Post_URL, post_id) {
  return axios.delete(Post_URL + post_id).then((response) => response.data)
}

const Reactions = (Post_URL) => {
  const [post, setPost] = useState([]);
  const navigate = useNavigate()
  let { id } = useParams();

  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  useEffect(() => {
    let mounted = true;

    return () => (mounted = false);
  }, []);

  const deletePostHandler = () => {
    confirmAlert({
      title: 'Confirm',
      message: 'Are you sure you want to delete this item?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            delete_post(Post_URL, post.id)
            navigate('/')
          }
        },
        {
          label: 'No'
        }
      ]
    });
    console.log("Delete")
  }

  const closePostsHandler = () => {
    console.log("close")
  }
  const ReportHandler = () => {
    console.log("report")
    
  }
  return (
    <div className='col-10'>
      <div className="border-light" key={post.id}>
        <div className="d-flex gap-2">
          <Link to='/r/1/p/1/edit' className='btn btn-light' ><FaEdit /> Edit</Link>
          <Link to='' onClick={deletePostHandler} className='btn btn-light' ><FaTrash /> Destroy</Link>
          <Link to='' onclick={closePostsHandler} className='btn btn-light' ><FaTimes /> Close</Link>
          <Link to='' className='btn btn-light' ><FaComment /> Comments</Link>
          
          <Link to="#" className='btn btn-light' onClick={openModal}> <FaFlag /> Report</Link>
         
          <div className={`modal ${isOpen ? 'show' : ''}`} tabIndex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Reports</h4>
              <button type="button" className="close" onClick={closeModal} aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <p>Following are the Reasons for Reporting</p>
              <ReportForm />
            </div>
            <div className="modal-footer">
             <button type="button" className="btn btn-danger" onClick={ReportHandler}>Report</button>
            </div>  
          </div>
        </div>
      </div>
        </div>
      </div>
    </div>
  )
}
export default Reactions
