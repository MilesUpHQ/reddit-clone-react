import './App.css';
import Home from './components/Home/Home';
import Form from './components/Form/Form';
import Navbar from './components/Navbar/Navbar';
import JsonData from './data/data.json'
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
        </Routes>
      </Router>
    </div>
  );
}

export default App;
