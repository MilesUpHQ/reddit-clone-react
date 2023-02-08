import React from 'react'
import { Admin, Resource } from 'react-admin'
import axios from 'axios'
import PostList from './PostList'

const dataProvider = axios.create({
  baseURL: 'http://localhost:3001/api/v1/communities/1/',
});

const AdminIndex = () => {
  return (
    <Admin dataProvider={async (type, resource) => {
      if (type === 'DELETE') {
        console.log(params)
        return dataProvider.delete(`posts/${params.id}`, {
          data: params
        });
      }
      
      try {
        const requestConfig = {
          method: 'GET',
          url: resource,
          headers: { 'Content-Type': 'application/json' },
        };
        const response = await dataProvider(requestConfig);
        let data = response.data;
        if (!Array.isArray(data)) {
          data = [data];
        }
        const newData = data.map((item, index) => ({ id: index, ...item }));
        console.log(newData);
        return { data: newData, total: newData.length };
      } catch (error) {
        return Promise.reject(error);
      }
    }}>
      <Resource name='posts' list={PostList} path="/posts" />
    </Admin>
  )
};

export default AdminIndex;
