import './App.css';
import Home from './components/Home/Home';
import Form from './components/Form/Form';
import Navbar from './components/Navbar/Navbar';
import JsonData from './data/data.json'
import NewPost from './components/Post/NewPost';
import Community from './components/Form/Community';
import Profile from './components/Accounts/Profile';
import Setting from './components/Accounts/Settings';
import Signout from './components/Accounts/Signout';
import { BrowserRouter as Router,	Routes, Route } from 'react-router-dom';


function App() {
  return (
    <div>
      <Navbar />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Form data = {JsonData.form.signup} />} />
          <Route path="/signin" element={<Form data = {JsonData.form.signin} />} />
          <Route path="/new" element={<NewPost />} />
          <Route path="/Community" element={<Community />} />
          <Route path="/Profile" element={<Profile />} />
          <Route path="/Settings" element={<Setting />} />
          <Route path="/Signout" element={<Signout />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
