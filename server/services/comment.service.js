const commentRepo = require("../repositories/comment.repositories");

async function getAllComments(postId) {
  const response = await commentRepo.getAll(postId);
  if (!response.length > 0) {
    return { status: "post comments were not found" };
  }
  return { status: "success", data: response };
}

async function addComment(postId, userId, content) {
  const response = await commentRepo.add(userId, postId, content);
  if (!response.affectedRows > 0) {
    return { status: "error" };
  }
  return { status: "added comment successfully" };
}

async function deleteComment(commentId, userId) {
  const comment = await commentRepo.getComment(commentId);
  if (comment[0].user_id !== userId) {
    console.log(userId);
    console.log(comment[0].user_id);

    return { status: "user lacks permissions" };
  }

  const response = await commentRepo.deleteComment(commentId);
  if (!response.affectedRows > 0) {
    return { status: "error" };
  }
  return { status: "deleted comment successfully" };
}
module.exports = { getAllComments, addComment, deleteComment };
