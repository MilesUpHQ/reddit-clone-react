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
      <Router>
        <Routes>
          <Route path="/" element={<div><Navbar /><Home /></div>} />
          <Route path="/signup" element={<div><Navbar /><Form data={JsonData.form.signup} /></div>} />
          <Route path="/signin" element={<div><Navbar /><Form data={JsonData.form.signin} /></div>} />
          <Route path="/new" element={<div><Navbar /><NewPost /></div>} />
          <Route path="/r/new" element={<div><Navbar /><NewCommunity /></div>} />
          <Route path="/r" element={<div><Navbar /><Index /></div>} />
          <Route path="/r/:id" element={<div><Navbar /><ShowCommunity /></div>} />
          <Route path="/r/:id/mod" element={<div><Navbar /><Modrator /></div>} />
          <Route path="/r/:id/edit" element={<div><Navbar /><EditCommunity /></div>} />
          <Route path="/r/:community_id/p/:id" element={<div><Navbar /><PostShow /></div>} />
          <Route path="/r/:community_id/p/:id/edit" element={<div><Navbar /><EditPost /></div>} />

          <Route path="/r/create" element={<div><Navbar /><create /></div>} />
          <Route path="/profile" element={<div><Navbar /><Profile /></div>} />
          <Route path="/settings" element={<div><Navbar /><Setting /></div>} />

          <Route path="/navsearch" element={<div><Navbar /><NavbarSearch /></div>} />
          <Route path="/*" element={<AdminIndex />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
