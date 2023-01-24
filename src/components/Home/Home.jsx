import React from 'react'
import Create_Post from './Create_Post';
import Tab_List from './Tab_List';


const Home = () => {
  return (
    <div>
      <h1>Reddit Clone</h1>
     <div class="community_post">
      <div class="row">
        <div class="col-sm-8">
          < Create_Post />
          < Tab_List />
        </div>
      </div>
    </div>
    </div>
  )
}

export default Home
