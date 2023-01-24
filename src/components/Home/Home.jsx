import React from 'react'
import Create_Post from './Create_Post';
import Tab_List from './Tab_List';
import Right_Tab from './Right_Tab';
import '../../css/Community.css'

const Home = () => {
  return (
    <div className="community_post">
      <div className="row">
        <div className="col-8 mr-auto">
          < Create_Post />
          < Tab_List />
        </div>
          <div className='col-4 mr-auto'> <Right_Tab /> </div>
      </div>
    </div>
  )
}

export default Home
