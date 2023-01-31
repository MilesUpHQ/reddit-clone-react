import React, { useEffect, useState } from 'react'
import Create_Post from './Create_Post';
import Tab_List from './Tab_List';
import Right_Tab from './Right_Tab';
import '../../css/Community.css'
import PostApi from './PostApi';

const Home = () => {
  const { get_all_posts } = PostApi();
  const [posts, setPosts] = useState();

  useEffect(() => {
    let mounted = true;
    get_all_posts().then((items) => {
      if (mounted) {
        setPosts(items);
      }
    });
    return () => (mounted = false);
  }, []);

  return (
    <div className="community_post">
      <div className="row">
        <div className="col-8 mr-auto">
          < Create_Post />
          < Tab_List posts={posts} />
        </div>
          <div className='col-4 mr-auto'> <Right_Tab /> </div>
      </div>
    </div>
  )
}

export default Home
