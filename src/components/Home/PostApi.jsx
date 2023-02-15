import { useState } from 'react'
import axios from 'axios'
import '../../css/Community.css'
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const PostApi = () => {
  const account = JSON.parse(localStorage.getItem('account'))
  const [comments, setComments] = useState([]);
  const [page, setPage] = useState(1);
  const limit = 15;
  const [text, setText] = useState('');
  let { id, community_id } = useParams();
  const [post, setPost] = useState({
    account_id: account.id,
    community_id: '',
    title: '',
    body: ''
  });
  const Post_URL = `http://localhost:3000/api/v1/communities/${post.community_id}/posts/`;
  const Posts_URL = `http://localhost:3000/api/v1/communities/${community_id}/posts?page=${page}&limit=${limit}`
  const Hot_Posts_URL = `http://localhost:3000/api/v1/communities/${community_id}/posts/${id}/hot_posts?page=${page}&limit=${limit}`
  const New_Posts_URL = `http://localhost:3000/api/v1/communities/${community_id}/posts/${id}/new_posts?page=${page}&limit=${limit}`
  const Best_Posts_URL = `http://localhost:3000/api/v1/communities/${community_id}/posts/${id}/best_posts?page=${page}&limit=${limit}`
  const Top_Posts_URL = `http://localhost:3000/api/v1/communities/${community_id}/posts/${id}/top_posts?page=${page}&limit=${limit}`
  const Comments_URL = `http://localhost:3000/api/v1/communities/${community_id}/posts/${id}/comments`
  const navigate = useNavigate()


  const set_new_post = async (post) => {
    await axios.post(Post_URL, { post }).then((response) => {
      if (response.status === 201) {
        toast.success("Post Created successfully!");
        navigate('/')
      }
    }).catch((error) => {
      console.log(error.response.data);
      toast.error("An error occured while submitting the Post");
    })
  }

  const get_all_posts = (page = 1, limit = 15) => {
    return axios.get(`${Posts_URL}?page=${page}&limit=${limit}`).then((response) => response.data)
  }

  const get_hot_posts = (page = 1, limit = 15) => {
    return axios.get(`${Hot_Posts_URL}?page=${page}&limit=${limit}`).then((response) => response.data)
  }

  const get_new_posts = (page = 1, limit = 15) => {
    return axios.get(`${New_Posts_URL}?page=${page}&limit=${limit}`).then((response) => response.data)
  }

  const get_best_posts = (page = 1, limit = 15) => {
    return axios.get(`${Best_Posts_URL}?page=${page}&limit=${limit}`).then((response) => response.data)
  }

  const get_top_posts = (page = 1, limit = 15) => {
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

  const fetchJoinedCommunity = async () => {
    return await axios.get(`http://localhost:3000/api/v1/banned_users?account_id=${account.id}`)
      .then((response) => response.data)
      .catch((error) => {
        console.log(error)
      })
  };

  return {
    post,
    setPost,
    set_new_post,
    get_all_posts,
    get_best_posts,
    get_hot_posts,
    get_new_posts,
    get_top_posts,
    set_comments,
    text,
    setText,
    comments,
    setComments,
    fetchJoinedCommunity
  }
}

export default PostApi
