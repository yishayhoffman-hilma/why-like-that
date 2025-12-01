const postRepo = require("../repositories/post.repositories");
async function getUsersPosts(userId) {
  const response = await postRepo.getFromUser(userId);
  return response;
}

async function getPosts() {
  const response = await postRepo.getAll();
  return response;
}

async function addPost(userId, content) {
  const response = await postRepo.create(userId, content);
  return response;
}
async function getPost(userId, postId) {
  const response = await postRepo.get(postId);
  console.log(`in service response ${JSON.stringify(response)}`);
  if (response.status !== "success") {
    response.content = response.status;
    return response;
  }
  if (response.data.user_id != userId) {
    console.log(`user id :${userId}`);
    console.log(`user post id ${response.data.user_id}`);

    return {
      status: "permission insufficent",
      content: "you do not have permission to see this post",
    };
  }
  return response;
}
module.exports = { addPost, getUsersPosts, getPost, getPosts };
