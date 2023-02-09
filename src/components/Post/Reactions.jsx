import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { confirmAlert } from 'react-confirm-alert';
import { FaRegCommentAlt, FaRegFlag, FaShare } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { HiDotsHorizontal } from 'react-icons/hi'
import { SlPencil, SlTrash, SlLock } from 'react-icons/sl'
import { NavDropdown } from 'react-bootstrap';
import ReportPost from './ReportPost';
import PostReport from './PostReport';

const Reactions = ({ post }) => {
  const navigate = useNavigate()
  let { community_id, id } = useParams();
  const Post_URL = `http://localhost:3000/api/v1/communities/${community_id}/posts/${id}/`;
  const account = JSON.parse(localStorage.getItem('account'))

  const [reportModalShow, setReportModalShow] = useState(false);

  const set_post = async (post) => {
    await axios.patch(Post_URL, { post }).then((response) => {
      if (response.status === 201) {
        toast.success("Post Closed successfully!");
        navigate(`/r/${community_id}/p` + id)
      }
    }).catch((error) => {
      console.log(error.response.data);
      toast.error("An error occured while Closing the Post");
    })
  }

  const delete_post = (Post_URL) => {
    return axios.delete(Post_URL).then((response) => response.data)
  }

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

  return (
    <div className='col-10'>
      <div className="row mt-1 mb-1" key={post.id}>
        <div className="col-12 d-flex gap-3">
          <Link to='' className="list-post-tab">
            <FaRegCommentAlt /> 0 Comments
          </Link>
          <Link to='' className="list-post-tab">
            <FaShare /> Share
          </Link>
          <PostReport />

          {account && post.account_id === account.id && (
            <NavDropdown
              title={<HiDotsHorizontal />}
              className="list-post-tab"
            >
              <NavDropdown.Item className='text-muted' href={`/r/${community_id}/p/${id}/edit`}>
                <SlPencil className='me-2' />Edit
              </NavDropdown.Item>
              <NavDropdown.Item className='text-muted' onClick={deletePostHandler} href=''>
                <SlTrash className='me-2' />Delete
              </NavDropdown.Item>
              <NavDropdown.Item className='text-muted' onClick={closePostHandler} href=''>
                <SlLock className='me-2' />Close
              </NavDropdown.Item>
            </NavDropdown>
          )}
        </div>
      </div>
    </div>
  )
}
export default Reactions
