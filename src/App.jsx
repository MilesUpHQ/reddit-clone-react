import './App.css';
import Home from './components/Home/Home';
import Signin from './components/Form/Signin';
import Signup from './components/Form/Signup';
import Navbar from './components/Navbar/Navbar';
import { BrowserRouter as Router,	Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div>
      <Navbar />
      <Router>
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
