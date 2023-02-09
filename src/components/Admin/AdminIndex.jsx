import React from 'react'
import { Admin, Resource} from 'react-admin'
import axios from 'axios'
import PostList,{PostEdit} from './PostList';

const dataProvider = axios.create({
  baseURL: 'http://localhost:3001/api/v1/communities/1/',
});

const AdminIndex = () => {
  return (
    <Admin dataProvider={async (type, resource, params) => {
      if (type === 'DELETE') {
        return dataProvider.delete(`posts/${params.id}`, {
          data: params
        });
      }
      if (type === 'GET_ONE') {
        try {
          const response = await dataProvider.get(`posts/${params.id}`);
          return { data: response.data };
        } catch (error) {
          return Promise.reject(error);
        }
      }

      if (type === 'UPDATE') {
        try {
          const response = await dataProvider.put(`posts/${params.id}`, params.data);
          return { data: response.data };
        } catch (error) {
          return Promise.reject(error);
        }
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
        return { data: newData, total: newData.length };
      } catch (error) {
        return Promise.reject(error);
      }
    }}>
      <Resource name='posts' list={PostList} edit={PostEdit} path="/posts"  />
    </Admin>
  )
};

export default AdminIndex;
