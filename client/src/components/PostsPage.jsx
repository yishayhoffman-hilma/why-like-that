import { useState, useEffect, Fragment } from "react";
import { Link } from "react-router";

export default function PostsPage() {
  const userId = JSON.parse(localStorage.getItem("ActiveUser")).userId;
  const currentUsername = JSON.parse(
    localStorage.getItem("ActiveUser")
  ).username;
  const [posts, setPosts] = useState([]);
  const [newPostContent, setNewPostContent] = useState([]);
  const [postStatus, setPostStatus] = useState();
  useEffect(() => {
    async function fetchPosts() {
      const response = await fetch(`http://localhost:3000/posts`);
      if (!response.ok) throw new Error("Failed to fetch posts");
      const jsonData = await response.json();
      setPosts(jsonData.posts);
    }
    fetchPosts();
  }, [userId]);

  async function addPost() {
    const response = await fetch(`http://localhost:3000/posts/${userId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: newPostContent }),
    });
    const jsonData = await response.json();
    setPostStatus(jsonData.status);
    setNewPostContent();
    if (!response.ok) {
      throw new Error("Failed to add post");
    } else if (jsonData.status !== "content cannon be empty") {
      setPosts((prev) => {
        return [
          ...prev,
          { content: newPostContent, username: currentUsername },
        ];
      });
    }
  }

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
      <button onClick={addPost}>add post</button>
      <p>{postStatus}</p>
      {posts.map((value, index) => {
        return (
          <Fragment key={index}>
            <div style={{ textAlign: "left" }}>
              <Link to={`${value.id}`}>
                <span className="author"> {value.username}:</span> <br></br>{" "}
                {value.content}
              </Link>
            </div>
            <br></br>
          </Fragment>
        );
      })}
    </>
  );
}
