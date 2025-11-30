import { Outlet } from "react-router";
import { Link } from "react-router";

function Home() {
  return (
    <>
      <nav style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
        <Link to="todolist">To Do List</Link>
        <Link to="posts">Posts</Link>
      </nav>
      <Outlet />
    </>
  );
}

export default Home;
