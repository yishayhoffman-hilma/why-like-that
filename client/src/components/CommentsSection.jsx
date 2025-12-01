import { useEffect, useState } from "react";
import Comment from "./Comment";

export default function CommentsSection(props) {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await fetch(
          `http://localhost:3000/comments/${props.postId}`
        );
        if (!response.ok) throw new Error("Failed to fetch posts");
        const jsonData = await response.json();
        console.log(jsonData);

        setComments(jsonData.data);
      } catch (error) {
        throw new Error(error);
      }
    }
    fetchPosts();
  }, [props.postId]);

  return (
    <>
      {comments.length === 0
        ? "No Comments"
        : comments.map((value, index) => {
            return <Comment key={index} content={value.content} />;
          })}
    </>
  );
}
