import { useEffect, useState } from "react";
import { useParams } from "react-router";

export default function Post() {
  const { postId } = useParams();
  const [post, setPost] = useState([]);
  const userId = JSON.parse(localStorage.getItem("ActiveUser")).userId;
  useEffect(() => {
    async function fetchPosts() {
      const response = await fetch(
        `http://localhost:3000/posts/${userId}/${postId}`
      );
      if (!response.ok) throw new Error("Failed to fetch posts");
      const jsonData = await response.json();
      setPost(jsonData);
    }
    fetchPosts();
  }, [postId, userId]);

  return (
    <>
      <p>{post.content}</p>
    </>
  );
}
