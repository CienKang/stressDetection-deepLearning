import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import EvaluatePage from './components/Evaluate';
import Home from './components/Home';
import Navbar from './components/Navbar';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignInPage from "./components/SignInPage";
import SignUpPage from "./components/SignUpPage";


import { useState } from "react";
import AudioRecorder from "./components/AudioRecorder";
import PageNotFound from "./components/PageNotFound";

function App() {
  const [loginStatus, setLoginStatus] = useState(false);
  const [userName, setUserName] = useState("Login Required");

  return (
    <div>
      <Router>
        <Navbar userName={userName} loginStatus={loginStatus} setLoginStatus={setLoginStatus} setUserName={setUserName} />
        <Routes>
          <Route exact path='/' element={<Home loginStatus={loginStatus} />} />
          <Route exact path='/evaluate' element={<EvaluatePage loginStatus={loginStatus} />} />
          <Route exact path='/signin' element={<SignInPage setLoginStatus={setLoginStatus} setUserName={setUserName} />} />
          <Route exact path='/signup' element={<SignUpPage setLoginStatus={setLoginStatus} setUserName={setUserName} />} />
          <Route exact path='/audio' element={<AudioRecorder />} />
          <Route path='/*' element={<PageNotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
