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
      <Routes>
        <Route path='/' element={<Home></Home>}></Route>
        <Route path='/posts' element={<Posts></Posts>}></Route>
        <Route path='/posts/write' element={<PostWrite></PostWrite>}></Route>
        <Route path='/posts/:id' element={<PostView></PostView>}></Route>
      </Routes>
    </>
  );
}

export default App;
