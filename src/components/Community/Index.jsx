import React from 'react'
import List from './List'
import MyComponent from './Categorylist'
import MyButton from "./create";
//import Mybutton from './joinButton'
const Index = () => {
  return (
    <div className='community_post1'>
      <div className="container mb-4">
        <h3 className="text-dark">Today's Top Growing Communities</h3>
        <div className="float-right">
        </div>
        <p className="text-muted">Browse Reddit's top growing communities. Find the top communities in your favorite category.</p>
      </div>
      <div className="d-flex justify-content-end ">
        <MyButton />
      </div>
      <div className="container">
        <div className="row">
          <div className="col-2">
            <div className="text-dark mb-3">
              <div className="list-group" id="list-tab" role="tablist">
                <li className="list-group-item text-white bg-secondary">Category</li>
              </div>
              <MyComponent />
              <div>
              </div>
            </div>
          </div>
          <div className="col-7">
            <div className="text-dark mb-3">
              <div className="list-group" id="nav-tabContent">
                <li className="list-group-item text-white bg-secondary">Today's Top Growing in Communities</li>
                <div className="tab-pane active" id="all_communities" role="tabpanel">
                  <div className="infinity">
                  </div>
                  <div className="infinite-scrolling">
                  </div>
                </div>
                <List />
                <div>
                  <h3 className="m-4">No communities to display.</h3>
                </div>
              </div>
            </div>
          </div>
          <div className="col-3">
            <div className="text-dark mb-3">
              <div className="list-group">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Index
