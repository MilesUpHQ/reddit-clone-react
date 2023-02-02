import React, { useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const PostApi = () => {
  const [comments, setComments] = useState([]);
  const [text, setText] = useState('');
  let { id, community_id } = useParams(); 
  const Posts_URL = 'http://localhost:3000/api/v1/communities/1/posts'
  const Comments_URL = `http://localhost:3000/api/v1/communities/${community_id}/posts/${id}/comments`

  const get_all_posts = () => {
    return axios.get(Posts_URL).then((response) => response.data)
  }

  const set_comments = async(currentText, parent) => {
    await axios.post(Comments_URL, {
      comment: { message: currentText, parent_id: parent },
      account_id: JSON.parse(localStorage.getItem('account')).id
    }, {
      headers: { 'Content-Type': 'application/json' }
    }).then((response) => {
      if (response.status === 201) {
        const newComment = response.data;
        setComments({
          ...comments,
          newComment
        }); 
        setText('');
        toast.success("Comment Created successfully!");
      }
    }).catch((error) => {
      console.error(error);
    });
  }

  return { get_all_posts, set_comments, text, setText, comments, setComments}
}

export default PostApi
