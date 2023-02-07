import React from 'react'
import {Admin, Resource} from 'react-admin'
import restProvider from 'ra-data-simple-rest'
import PostList from './PostList'

function AdminIndex() {
  return (
    <Admin dataProvider={restProvider(`http://localhost:3000/api/v1/communities/1/posts/`)}>
        <Resource name='adminposts' list={PostList} />
    </Admin>
  )
}

export default AdminIndex
