import React, { useState, useEffect } from 'react';

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
          <div key={subscription.id}>{subscription.community && subscription.community.name}</div>
        ))}
      </ul>
    </div>
  );
};

export default SubscriptionsList;

