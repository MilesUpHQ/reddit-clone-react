import React, { useState, useEffect } from 'react';
import reddit_logo from '../../images/reddit-logo.png';
import '../../css/post.css';
import axios from 'axios';
import Dropdown from 'react-bootstrap/Dropdown';

const SubscriptionsList = ({ accountId }) => {

  const [subscriptions, setSubscriptions] = useState([]);
  const fetchData = async () => {
    return await axios.get(`http://localhost:3000/api/v1/subscriptions?account_id=${accountId}`)
      .then((response) => response.data)
      .catch((error) => {
        console.log(error)
      })
  };

  useEffect(() => {
    let mounted = true;
    fetchData().then((items) => {
      if (mounted) {
        setSubscriptions(items)
      }
    });
    return () => (mounted = false);
  }, []);

  return (
    <div>
      <ul>
        {subscriptions.map((subscription) => (
          <div key={subscription.id}>
            <Dropdown.Item href={`http://localhost:3001/r/${subscription.community_id}`} className="text-dark">
              {subscription.community.profile_image && subscription.community.profile_image.url ? [
                <img src={`http://localhost:3000${subscription.community.profile_image.url}`} className='community-icon' alt="" />
              ] : [
                <img src={reddit_logo} className='community-icon' alt="" />
              ]}
              r/{subscription.community && subscription.community.name}
            </Dropdown.Item>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default SubscriptionsList;

