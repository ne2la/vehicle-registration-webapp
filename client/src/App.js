import './App.css';
import NavBar from './components/navbar/NavBar';
import Home from './components/pages/Home';
import {Route, BrowserRouter as Router ,Routes, Navigate} from "react-router-dom"
import Auth from './components/auth/Auth';
import PostDetails from './components/postDetails/PostDetails';


function App() {
  return (
    <>
      <Router>
          <NavBar/>

          <Routes>

            <Route path='/' exact element={<Navigate replace to="/posts"/> }/>
            <Route path='/posts' exact element={<Home/>}/>
            <Route path="/auth" exact element={<Auth/>}/>
            <Route path='/posts/:id' exact element={<PostDetails/>}/>
            
          </Routes>
      </Router>
    </>
  );
}

export default App;
