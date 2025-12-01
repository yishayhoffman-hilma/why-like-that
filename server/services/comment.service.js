const commentRepo = require("../repositories/comment.repositories");

async function getAllComments(postId) {
  const response = await commentRepo.getAll(postId);
}
async function addComment(postId, userId, contnet) {
  const response = await commentRepo.add(postId, userId, contnet);
}
module.exports = {};
