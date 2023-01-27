import React from 'react'
import SearchTab from './SearchTab'

const Nav_URL = 'http://localhost:3000/api/v1/navbar_search/'

function NavbarSearch() {
  return (
    <div>
      <div class="margin-search">
          <SearchTab />
      </div>
    </div>
  )
}

export default NavbarSearch 
