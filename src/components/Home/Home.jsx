import React from 'react'
import Create_Post from './Create_Post';
import Tab_List from './Tab_List';
import Right_Tab from './Right_Tab';

const Home = () => {
  return (
    <div>
     
    <div className="community_post">
      <div className="row">
        <div className="col-7 mr-auto">
          < Create_Post />
          < Tab_List />
        </div>
          <div className='col-5 mr-auto'> <Right_Tab /> </div>
      </div>
    </div>
    </div>
  )
}

export default Home
