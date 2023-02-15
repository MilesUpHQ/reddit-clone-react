import React, { useState } from 'react'
import { toast } from 'react-toastify'
import PostApi from '../Home/PostApi'

const HandlePostForm = () => {

  const { post, setPost, set_new_post, fetchJoinedCommunity } = PostApi()
  const [selectedCommunity, setSelectedCommunity] = useState([])

  const onSelectCommunity = (event) => {
    setSelectedCommunity(event)
    setPost({
      ...post,
      'community_id': event.value
    });
  }

  const onChange = (event) => {
    setPost({ ...post, [event.target.name]: event.target.value });
    console.log(event.target.value)
  }

  const handleChange = (content, delta, source, editor) => {
    setPost({ ...post, body: content });
  }

  const onSubmit = (event) => {
    event.preventDefault();
    if (!post.body) {
      toast.error("Post body can't be blank");
      return;
    }
    set_new_post(post);
  }

  return {
    onSelectCommunity,
    onChange,
    handleChange,
    onSubmit,
    selectedCommunity,
    setSelectedCommunity,
  }
}

export default HandlePostForm
