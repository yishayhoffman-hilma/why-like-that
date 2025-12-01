import { useState, useEffect, Fragment } from "react";
import { Link } from "react-router";

export default function PostsPage() {
  const userId = JSON.parse(localStorage.getItem("ActiveUser")).userId;
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    async function fetchPosts() {
      const response = await fetch(`http://localhost:3000/posts/${userId}`);
      if (!response.ok) throw new Error("Failed to fetch posts");
      const jsonData = await response.json();
      setPosts(jsonData.posts);
    }
    fetchPosts();
  }, [userId]);

  return (
    <>
      {posts.map((value, index) => {
        return (
          <Fragment key={index}>
            <Link to={`${value.id}`}>{value.content} </Link>
            <br></br>
          </Fragment>
        );
      })}
    </>
  );
}
