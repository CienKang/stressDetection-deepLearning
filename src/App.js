import './App.css';
import EvaluatePage from './components/Evaluate';
import Home from './components/Home';
import Navbar from './components/Navbar';

import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';

function App() {
  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route exact path='/' element={<Home/>} />
          <Route exact path='/evaluate' element={<EvaluatePage/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
