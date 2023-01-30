import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { confirmAlert } from 'react-confirm-alert';
import '../../css/Post_btn.css'
import { FaEdit, FaTrash, FaTimes, FaComment, FaFlag } from 'react-icons/fa';

function delete_post(Post_URL, post_id) {
  return axios.delete(Post_URL + post_id).then((response) => response.data)
}

const Reactions = (Post_URL, get_post_data) => {
    const [post, setPost] = useState([]);
    const navigate = useNavigate()
    let { id } = useParams();
  
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
  
    return (
      <div className='col-10'>
        <div className="border-light" key={post.id}>
          <div className="d-flex gap-2">
            <Link to='' className='btn btn-light' ><FaEdit /> Edit</Link>
            <Link to='' onClick={deletePostHandler} className='btn btn-light' ><FaTrash /> Destroy</Link>
            <Link to='' className='btn btn-light' ><FaTimes /> Close</Link>
            <Link to='' className='btn btn-light' ><FaComment /> Comments</Link>
            <Link to='' className='btn btn-light' ><FaFlag /> Report</Link>
          </div>
        </div>
      </div>
    )
  }
  export default Reactions
  