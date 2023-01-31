import './App.css';
import Home from './components/Home/Home';
import Form from './components/Form/Form';
import Navbar from './components/Navbar/Navbar';
import JsonData from './data/data.json'
import NewPost from './components/Post/NewPost';
import PostShow from './components/Post/PostShow';
import create from './components/Community/create';
import Profile from './components/Accounts/Profile';
import Setting from './components/Accounts/Settings';
import Signout from './components/Accounts/Signout';
import { BrowserRouter as Router,	Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import Index from './components/Community/Index';
import Show from './components/Community/Show';
import NewCommunity from './components/Community/Form/NewCommunity';
import EditCommunity from './components/Community/Form/EditCommunity';
import EditPost from './components/Post/Form/EditPost';



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
          <Route path="/r/:community_id" element={<Show />} />
          <Route path="/r/:community_id/p/:id" element={<PostShow />} />
          <Route path="/r/:community_id/edit" element={<EditCommunity />} />
          <Route path="/r/:community_id/p/:id/edit" element={<EditPost />} />

          <Route path="/r/create" element={<create />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Setting />} />
          <Route path="/signout" element={<Signout />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
