import React from 'react'
import { Admin, Resource} from 'react-admin'
import PostIcon from "@mui/icons-material/Book";
import CommunityIcon from "@mui/icons-material/Group";
import CategoryIcon from "@mui/icons-material/Folder";
import ReportIcon from '@mui/icons-material/Report';
import axios from 'axios'
import PostList,{PostCreate,PostEdit} from './PostList';
import CommunityList,{CommunityCreate,  CommunityEdit } from './CommunityList';
import CategoryList, { CategoryCreate, CategoryEdit } from './CategoryList';
import ReportList, {ReportCreate} from './ReportList'
import AuthProvider from './AuthProvider';
import { createBrowserHistory as createHistory } from 'history';
import { createTheme } from '@material-ui/core/styles'
import LoginPage from './LoginPage';
import { Dashboard } from './Dashboard';

const history = createHistory();

const theme = createTheme({
  palette: {
    type: 'light', 
  },
});

const dataProvider = axios.create({
  baseURL: 'http://localhost:3001/api/v1/',
});

const AdminIndex = () => {
  return (
    <Admin dataProvider={async (type, resource, params) => {
      if (type === 'DELETE') {
        return dataProvider.delete(`${resource}/${params.id}`, {
          data: params
        });
      }
      if (type === 'CREATE'){
        try {
          const response = await dataProvider.post(`${resource}`, params.data);
          console.log(response);
          return { data: response.data };
        } catch (error) {
          console.error(error);
          return Promise.reject(error);
        }
      }


      if (type === 'GET_ONE') {
        try {
          const response = await dataProvider.get(`${resource}/${params.id}`);
          return { data: response.data };
        } catch (error) {
          return Promise.reject(error);
        }
      }

      if (type === 'UPDATE') {
        try {
          const response = await dataProvider.put(`${resource}/${params.id}`, params.data);
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
        let data = (resource=== 'communities/1/posts') ? response.data.posts : ((resource=== 'communities') ? response.data.communities: response.data);
        if (!Array.isArray(data)) {
          data = [data];
        }
        const newData = data.map((item, index) => ({ id: index, ...item }));
        return { data: newData, total: newData.length };
      } catch (error) {
        return Promise.reject(error);
      }
    }}   theme={theme}  loginPage={LoginPage} authProvider={AuthProvider} dashboard={Dashboard}>

      <Resource name='communities/1/posts' list={PostList} create={PostCreate} edit={PostEdit} path="/posts" icon={PostIcon}/>
      <Resource name='communities' list={CommunityList}  create={CommunityCreate} edit={CommunityEdit} path="/communities" icon={CommunityIcon}/>
      <Resource name='categories' list={CategoryList} create={CategoryCreate} edit={CategoryEdit} path="/categories" icon={CategoryIcon}/>
      <Resource name='communities/1/posts/1/reports' list={ReportList} create={ReportCreate}  path="/reports" icon={ReportIcon}/>
    </Admin>
  )
};

export default AdminIndex;
