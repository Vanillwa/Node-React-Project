/* eslint-disable */
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Posts from "./pages/Posts";
import Header from "./components/Header";
import PostWrite from "./pages/PostWrite";
import PostView from "./pages/PostView";

function App() {
  return (
    <>
      <Header></Header>
      <div className='main-container'>
        <Routes basename={process.env.PUBLIC_URL}>
          <Route path='/' element={<Home></Home>}></Route>
          <Route path='posts'>
            <Route index element={<Posts></Posts>}></Route>
            <Route path=':id' element={<PostView></PostView>}></Route>
            <Route path='write' element={<PostWrite></PostWrite>}></Route>
          </Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
