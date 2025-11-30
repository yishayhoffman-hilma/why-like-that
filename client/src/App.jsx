import { Routes, Route, Navigate } from "react-router";

import Login from "./components/LoginPage";
import Home from "./components/Home";
import Todo from "./components/Todo";
import "../src/App.css";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />

        <Route path="/home" element={<Home />}>
          <Route path="todolist" element={<Todo />} />
          {/* // <Route path="posts" element={<Posts />} />
          // <Route path="posts/post/:postId" element={<PostDetails />} /> */}
        </Route>

        <Route path="*" element={<h1>EROR 404</h1>} />
      </Routes>
    </>
  );
}

export default App;
