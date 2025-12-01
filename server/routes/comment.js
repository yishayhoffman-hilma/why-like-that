var express = require("express");
var router = express.Router();
const commentService = require("../services/comment.service");
router.get("/:postId", async function (req, res) {
  const postId = Number(req.params.postId);

  if (isNaN(postId)) {
    res.send({ status: "postId is not a number" });
  } else {
    const response = await commentService.getPost(postId);
    res.send(response);
  }
  res.send("");
});

module.exports = router;
