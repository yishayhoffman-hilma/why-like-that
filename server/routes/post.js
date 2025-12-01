var express = require("express");
var router = express.Router();
const postService = require("../services/post.service");
router.get("/:userId", async function (req, res) {
  const userId = Number(req.params.userId);

  if (isNaN(userId)) {
    res.send({ status: "userId is not a number" });
  } else {
    const response = await postService.getUsersPosts(userId);
    res.send(JSON.stringify(response) + "\n");
  }
});

router.get("/:userId/:postId", async function (req, res) {
  const userId = Number(req.params.userId);
  const postId = Number(req.params.postId);

  if (isNaN(userId) || isNaN(postId)) {
    res.send({ status: "userId or postId is not a number" });
  } else {
    const response = await postService.getPost(userId, postId);
    res.send(response);
  }
});

router.post("/:userId", async function (req, res) {
  const userId = Number(req.params.userId);
  const content = req.body.content;
  console.log(userId);
  console.log(content);

  if (isNaN(userId) || !content) {
    res.send({ status: "bad" });
  } else {
    const response = await postService.addPost(userId, content);
    res.send(response);
  }
});

module.exports = router;
