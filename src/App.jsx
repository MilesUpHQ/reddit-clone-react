import './App.css';

import Home from './components/Home/Home';
import AdminIndex from './components/Admin/AdminIndex'
import Form from './components/Form/Form';
import Navbar from './components/Navbar/Navbar';
import JsonData from './data/data.json'
import NewPost from './components/Post/NewPost';
import PostShow from './components/Post/PostShow';
import create from './components/Community/create';
import Profile from './components/Accounts/Profile';
import Setting from './components/Accounts/Settings';
import { BrowserRouter as Router,	Routes, Route} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import Index from './components/Community/Index';
import ShowCommunity from './components/Community/ShowCommunity';
import NewCommunity from './components/Community/Form/NewCommunity';
import EditCommunity from './components/Community/Form/EditCommunity';
import EditPost from './components/Post/Form/EditPost';
import Modrator from './components/Community/Modrator/Modrator';

import NavbarSearch from './components/Post/NavbarSearch'
import PostList from './components/Post/PostList';


function App() {
  return (
    <div>
      <ToastContainer />
      <Navbar />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Form data={JsonData.form.signup} />} />
          <Route path="/signin" element={<Form data={JsonData.form.signin} />} />
          <Route path="/new" element={<NewPost />} />
          <Route path="/r/new" element={<NewCommunity />} />
          <Route path="/r" element={<Index />} />
          <Route path="/r/:id" element={<ShowCommunity />} />
          <Route path="/r/:id/mod" element={<Modrator />} />
          <Route path="/r/:id/edit" element={<EditCommunity />} />
          <Route path="/r/:community_id/p/:id" element={<PostShow />} />
          <Route path="/r/:community_id/p/:id/edit" element={<EditPost />} />

          <Route path="/r/create" element={<create />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Setting />} />

          <Route path="/navsearch" element={<NavbarSearch />} />
          <Route path="/*"  element={<AdminIndex />}   />
         
        </Routes>
      </Router>
    </div>
  );
}

export default App;
