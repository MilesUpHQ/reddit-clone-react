import React from 'react'
import { Admin, Resource} from 'react-admin'
import PostIcon from "@mui/icons-material/Book";
import CommunityIcon from "@mui/icons-material/Group";
import axios from 'axios'
import PostList,{PostEdit} from './PostList';
import CommunityList,{CommunityEdit} from './CommunityList';
import { Dashboard } from './Dashboard';

const dataProvider = axios.create({
  baseURL: 'http://localhost:3001/api/v1/',
});

const AdminIndex = () => {
  return (
    <Admin dataProvider={async (type, resource, params) => {
      if (type === 'DELETE') {
        return dataProvider.delete(`communities/1/posts/${params.id}`, {
          data: params
        });
      }
      if (type === 'GET_ONE') {
        try {
          const response = await dataProvider.get(`communities/1/posts/${params.id}`);
          return { data: response.data };
        } catch (error) {
          return Promise.reject(error);
        }
      }

      if (type === 'UPDATE') {
        try {
          const response = await dataProvider.put(`communities/1/posts/${params.id}`, params.data);
          return { data: response.data };
        } catch (error) {
          return Promise.reject(error);
        }
      }

      try {
        const requestConfig = {
          method: 'GET',
          url: 'communities/1/posts',
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
    }}  dashboard={Dashboard}>
      <Resource name='posts' list={PostList} edit={PostEdit} path="/posts" icon={PostIcon}/>
      <Resource name='communities' list={CommunityList} edit={CommunityEdit} path="/communities" icon={CommunityIcon}/>
    </Admin>
  )
};

export default AdminIndex;
