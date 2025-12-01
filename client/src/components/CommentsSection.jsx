import { useEffect, useState } from "react";
import Comment from "./Comment";

export default function CommentsSection(props) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState([]);
  const [statusMessage, setStatusMessage] = useState("");
  const activeUser = JSON.parse(localStorage.getItem("ActiveUser"));
  const userId = activeUser.userId;

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await fetch(
          `http://localhost:3000/comments/${props.postId}`
        );
        if (!response.ok) throw new Error("Failed to fetch posts");
        const jsonData = await response.json();

        setComments(jsonData.data);
      } catch (error) {
        throw new Error(error);
      }
    }
    fetchPosts();
  }, [props.postId]);

  async function deleteComment(commentId) {
    try {
      const response = await fetch(
        `http://localhost:3000/comments/${commentId}/${userId}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        }
      );
      if (!response.ok) throw new Error("failed");
      setComments((prev) => {
        return prev.filter((c) => {
          return c.id !== commentId;
        });
      });
    } catch (error) {
      console.error(error);
    }
  }

  async function addNewComment() {
    try {
      const response = await fetch(
        `http://localhost:3000/comments/${props.postId}/${userId}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ content: newComment }),
        }
      );
      if (!response.ok) throw new Error("failed");
      const jsonData = await response.json();
      setStatusMessage(jsonData);
      setComments((prev) => {
        const comment = {
          content: newComment,
          username: activeUser.username,
          userId,
        };
        return [...prev, comment];
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <input
          onChange={(e) => {
            setNewComment(e.target.value);
          }}
          value={newComment}
        />

        <button onClick={addNewComment}>add comment</button>
        <p>{statusMessage.status}</p>
      </div>

      {comments.length === 0
        ? "No Comments"
        : comments.map((value, index) => {
            return (
              <Comment
                author={value.username}
                key={index}
                content={value.content}
                userId={value.user_id}
                deleteComment={deleteComment}
                id={value.id}
              />
            );
          })}
    </>
  );
}
