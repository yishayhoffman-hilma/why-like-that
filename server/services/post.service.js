const postRepo = require("../repositories/post.repositories");
async function getUsersPosts(userId) {
  const response = await postRepo.getFromUser(userId);
  return response;
}

async function addPost(userId, content) {
  const response = await postRepo.create(userId, content);
  return response;
}
module.exports = { addPost, getUsersPosts };
