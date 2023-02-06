import React, { useState, useEffect } from 'react';
import reddit_logo from '../../images/reddit-logo.png';
import '../../css/post.css';
import Dropdown from 'react-bootstrap/Dropdown';

const SubscriptionsList = ({ accountId }) => {
  const [subscriptions, setSubscriptions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`http://localhost:3000/api/v1/subscribers?account_id=${accountId}`);
      const data = await response.json();
      setSubscriptions(data);
    };

    fetchData();
  }, [accountId]);

  return (
    <div>
      <ul>
        {subscriptions.map((subscription) => (
          <div key={subscription.id}>
            <Dropdown.Item href={`http://localhost:3001/r/${subscription.community_id}`} className="text-dark">
              r/{subscription.community && subscription.community.name}
            </Dropdown.Item>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default SubscriptionsList;

