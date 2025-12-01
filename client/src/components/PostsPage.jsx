import { useState, useEffect, Fragment } from "react";
import { Link } from "react-router";

export default function PostsPage() {
  const userId = JSON.parse(localStorage.getItem("ActiveUser")).userId;
  const [posts, setPosts] = useState([]);
  const [newPostContent, setNewPostContent] = useState([]);
  useEffect(() => {
    async function fetchPosts() {
      const response = await fetch(`http://localhost:3000/posts`);
      if (!response.ok) throw new Error("Failed to fetch posts");
      const jsonData = await response.json();
      setPosts(jsonData.posts);
    }
    fetchPosts();
  }, [userId]);

  return (
    <>
      <textarea
        onChange={(e) => {
          setNewPostContent(e.target.value);
        }}
        placeholder="type your post here"
        value={newPostContent}
      >
        {newPostContent}
      </textarea>
      <br></br>
      <button>add post</button>
      {posts.map((value, index) => {
        console.log(value);

        return (
          <Fragment key={index}>
            <div style={{ textAlign: "left" }}>
              <Link to={`${value.id}`}>
                {value.username}: <br></br> {value.content}
              </Link>
              <br></br>
              <button>show comments</button>
            </div>
          </Fragment>
        );
      })}
    </>
  );
}
