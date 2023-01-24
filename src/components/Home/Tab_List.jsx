import React from 'react'
import {FaRocket, FaFire, FaTag , FaPoll } from 'react-icons/fa'
import '../../css/Tab.css'
import Best from './Best';
import Hot from './Hot';
import New from './New';
import Top from './Top';

import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
const Tab_List= () => {
  return (
    <div>
     <div className="card p-1 pl-3 pr-3 mb-3">
     <div className="row">
      <div className="col-9 p-2">
       <div className="">
       <Tabs
          defaultActiveKey="best"
          id="justify-tab-example"
          className="mb-3"
          justify
          >
        <Tab eventKey="best" title={<span>{<FaRocket />} Best</span>} tabClassName="post-tab-nav-link"> <Best /> </Tab>
        <Tab eventKey="hot" title={<span>{<FaFire />} Hot</span>} tabClassName="post-tab-nav-link"> <Hot /> </Tab>
        <Tab eventKey="new" title={<span>{<FaTag />} New</span>} tabClassName="post-tab-nav-link"> <New /></Tab>
        <Tab eventKey="top" title={<span>{<FaPoll />} Top</span>} tabClassName="post-tab-nav-link"> <Top /> </Tab>
       </Tabs>

      </div>
      </div>
    </div>
  </div>
    </div>
  )
}

export default Tab_List 
