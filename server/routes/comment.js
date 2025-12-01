var express = require("express");
var router = express.Router();
const commentService = require("../services/comment.service");
router.get("/:postId", async function (req, res) {
  const postId = Number(req.params.postId);

  if (isNaN(postId)) {
    res.send({ status: "postId is not a number" });
  }
  const response = await commentService.getAllComments(postId);
  if (response.data === undefined) {
    res.status(404);
  }
  res.send(response);
});

router.post("/:postId/:userId", async function (req, res) {
  const postId = Number(req.params.postId);
  const userId = Number(req.params.userId);
  const content = req.body.content;

  if (isNaN(postId) || isNaN(userId)) {
    res.send({ status: "postId or userId is not a number" });
  }
  if (!content || !content.length > 0) {
    res.send({ status: "content cannot be empty" });
  }

  const response = await commentService.addComment(postId, userId, content);
  res.send(response);
});

router.delete("/:commentId/:userId", async function (req, res) {
  const commentId = Number(req.params.commentId);
  const userId = Number(req.params.userId);

  if (isNaN(commentId) || isNaN(userId)) {
    res.send({ status: "commentId or userId is not a number" });
  }

  const response = await commentService.deleteComment(commentId, userId);
  res.send(response);
});

module.exports = router;
