import { Routes, Route, Navigate } from "react-router";

import Login from "./components/LoginPage";
import "../src/App.css";
import PostsPage from "./components/PostsPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />

        {/* <Route element={<ProtectedRoute />}>
            <Route path="/home/:username/*" element={<Home />} /> 
           </Route>  */}

        <Route path="/posts" element={<PostsPage />} />
        <Route path="*" element={<h1>ERROR 404</h1>} />
      </Routes>
    </>
  );
}

export default App;
