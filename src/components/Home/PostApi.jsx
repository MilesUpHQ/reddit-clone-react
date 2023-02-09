import { useState } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const PostApi = () => {
  const [comments, setComments] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(3);
  const [text, setText] = useState('');
  let { id, community_id } = useParams();
  const Posts_URL = `http://localhost:3000/api/v1/communities/${community_id}/posts?page=${page}&limit=${limit}`
  const Hot_Posts_URL = `http://localhost:3000/api/v1/communities/${community_id}/posts/${id}/hot_posts?page=${page}&limit=${limit}`
  const New_Posts_URL = `http://localhost:3000/api/v1/communities/${community_id}/posts/${id}/new_posts?page=${page}&limit=${limit}`
  const Best_Posts_URL = `http://localhost:3000/api/v1/communities/${community_id}/posts/${id}/best_posts?page=${page}&limit=${limit}`
  const Top_Posts_URL = `http://localhost:3000/api/v1/communities/${community_id}/posts/${id}/top_posts?page=${page}&limit=${limit}`
  const Comments_URL = `http://localhost:3000/api/v1/communities/${community_id}/posts/${id}/comments`
  const navigate = useNavigate()

  const get_all_posts = (page = 1, limit = 2) => {
    return axios.get(`${Posts_URL}?page=${page}&limit=${limit}`).then((response) => response.data)
  }

  const get_hot_posts = (page = 1, limit = 2) => {
    return axios.get(`${Hot_Posts_URL}?page=${page}&limit=${limit}`).then((response) => response.data)
  }

  const get_new_posts = (page = 1, limit = 2) => {
    return axios.get(`${New_Posts_URL}?page=${page}&limit=${limit}`).then((response) => response.data)
  }

  const get_best_posts = (page = 1, limit = 2) => {
    return axios.get(`${Best_Posts_URL}?page=${page}&limit=${limit}`).then((response) => response.data)
  }

  const get_top_posts = (page = 1, limit = 2) => {
    return axios.get(`${Top_Posts_URL}?page=${page}&limit=${limit}`).then((response) => response.data)
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
