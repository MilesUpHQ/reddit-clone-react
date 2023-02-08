import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const PostApi = () => {
  const [comments, setComments] = useState([]);
  const [text, setText] = useState('');
  let { id, community_id } = useParams();
  const Posts_URL = 'http://localhost:3000/api/v1/communities/1/posts'
  const Hot_Posts_URL = 'http://localhost:3000/api/v1/communities/1/posts/1/hot_posts'
  const New_Posts_URL = 'http://localhost:3000/api/v1/communities/1/posts/1/new_posts'
  const Best_Posts_URL = 'http://localhost:3000/api/v1/communities/1/posts/1/best_posts'
  const Top_Posts_URL = 'http://localhost:3000/api/v1/communities/1/posts/1/top_posts'
  const Comments_URL = `http://localhost:3000/api/v1/communities/${community_id}/posts/${id}/comments`
  const navigate = useNavigate()

  const get_all_posts = () => {
    return axios.get(Posts_URL).then((response) => response.data)
  }



  const set_comments = async (currentText, parent) => {
    if (!currentText) {
      toast.error("Comment cannot be empty!");
      return;
    }
    await axios.post(Comments_URL, {
      comment: { message: currentText.replace(/<[^>]+>/g, ''), parent_id: parent },
      account_id: JSON.parse(localStorage.getItem('account')).id
    }, {
      headers: { 'Content-Type': 'application/json' }
    }).then((response) => {
      if (response.status === 201) {
        setText('');
        fetchComments();
        toast.success("Comment Created successfully!");
        navigate(`/r/${community_id}`)
      }
    }).catch((error) => {
      console.error(error);
    });
  }
  const fetchComments = async () => {
    const response = await axios.get(Comments_URL);
    setComments(response.data);
  };

  return { get_all_posts, get_best_posts, get_hot_posts, get_new_posts, get_top_posts, set_comments, text, setText, comments, setComments }
}

export default PostApi
