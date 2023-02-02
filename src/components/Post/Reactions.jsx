import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { confirmAlert } from 'react-confirm-alert';
import { FaEdit, FaTrash, FaTimes, FaComment, FaFlag } from 'react-icons/fa';
import EditPost from '../../components/Post/Form/EditPost';
import ReportForm from './ReportForm'
import { toast } from 'react-toastify';

function delete_post(Post_URL) {
  return axios.delete(Post_URL).then((response) => response.data)
}

const Reactions = () => {
  const [post, setPost] = useState([]);
  const navigate = useNavigate()
  let { community_id, id } = useParams();
  const Post_URL = `http://localhost:3000/api/v1/communities/${community_id}/posts/${id}/`;

  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const set_post = async (post) => {
    await axios.patch(Post_URL, { post }).then((response) => {
      if (response.status === 201) {
        toast.success("Post Closed successfully!");
      }
    }).catch((error) => {
      console.log(error.response.data);
      toast.error("An error occured while Closing the Post");
    })
  }

  useEffect(() => {
    let mounted = true;

    return () => (mounted = false);
  }, []);

  const deletePostHandler = () => {
    confirmAlert({
      title: 'Confirm',
      message: 'Are you sure you want to delete this post?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            delete_post(Post_URL, post.id)
            toast.success("Post Deleted successfully!");
            navigate(`/r/${community_id}`)
          }
        },
        {
          label: 'No'
        }
      ]
    });
    console.log("Delete")
  }

  const closePostHandler = () => {
    confirmAlert({
      title: 'Confirm',
      message: 'Are you sure you want to close delete this post.Further Changes cannot be done?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            set_post({ ...post, isclosed: true });
            toast.success("Post Closed successfully!");
          }
        },
        {
          label: 'No'
        }
      ]
    });
    console.log("Delete")
  }

  const ReportHandler = () => {
    console.log("report")
  }
  return (
    <div className='col-10'>
      <div className="border-light" key={post.id}>
        <div className="d-flex gap-2">
          <Link to={`/r/${community_id}/p/${id}/edit`} className='btn btn-light' ><FaEdit />  Edit</Link>
          <Link to='' onClick={deletePostHandler} className='btn btn-light' ><FaTrash /> Destroy</Link>


          <Link to='#' onClick={closePostHandler} className='btn btn-light'><FaTimes /> Close</Link>


          <Link to='#' className='btn btn-light' ><FaComment /> Comments</Link>
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
