import React from 'react'
import {useParams} from 'react-router-dom'
import SearchTab from './SearchTab'


function NavbarSearch() {
  let {query} = useParams()
  return (
    <div>
      <div className="margin-search">
          <SearchTab  />
      </div>
    </div>
  )
}

export default NavbarSearch 
