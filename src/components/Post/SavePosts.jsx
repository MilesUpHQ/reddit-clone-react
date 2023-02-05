import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaBookmark, FaRegBookmark } from 'react-icons/fa'
import axios from 'axios';
import '../../css/post.css';
import { toast } from 'react-toastify';


function SavePosts({ post }) {
    const [isSaved, setIsSaved] = useState(
        localStorage.getItem(`savedPost-${post.id}`) === 'true'
    );

    const current_account = JSON.parse(localStorage.getItem('account'))
    const handleSave = async (postId) => {
        try {
            if (isSaved) {
                await axios.delete(`http://localhost:3000/api/v1/accounts/${current_account.id}/save_posts/${postId}`);
                toast.warning("Post Unsaved successfully!");
                console.log("Delete");
                localStorage.setItem(`savedPost-${postId}`, false);
            } else {
                const response = await fetch(`http://localhost:3000/api/v1/accounts/${current_account.id}/save_posts/`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },

                    body: JSON.stringify({ post_id: postId, account_id: current_account.id })
                });
                const data = await response.json();
                if (response.status === 201) {
                    toast.success("Post Saved successfully!");
                    localStorage.setItem(`savedPost-${postId}`, true);
                }
            }
            setIsSaved(!isSaved);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <Link to='' className={`list-post-tab ${isSaved ? 'saved' : ''}`}
                onClick={() => handleSave(post.id)}>
                {isSaved ? 
                  <FaBookmark /> : 
                  <FaRegBookmark />}
                Save
            </Link>
        </div>
    )
}

export default SavePosts
