const express = require('express');
const { randomBytes } = require('crypto');
const cors = require('cors');
const axios = require("axios")

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const commentsByPostId = {};

app.get('/posts/:id/comments', (req, res) => {
  res.send(commentsByPostId[req.params.id] || []);
});

app.post('/posts/:id/comments', async (req, res) => {
  const commentId = randomBytes(4).toString('hex');
  const { content } = req.body;

  const comments = commentsByPostId[req.params.id] || [];

  comments.push({ id: commentId, content, status: "pending" });

  commentsByPostId[req.params.id] = comments;

  try {
    await axios.post("http://localhost:4005/events", {
      type: "CommentCreated",
      data: {
        id: commentId,
        content,
        postId: req.params.id,
        status: "pending"
      }
    });
  } catch (error) {
    console.error("Failed to send event", error.message);
  }

  res.status(201).send(comments);
});

app.post("/events", async (req, res) => {
  const { type, data } = req.body;

  if (type === 'CommentModerated') {
    const { postId, content, id, status } = data;
    const comments = commentsByPostId[postId];

    const comment = comments.find((comment) => {
      return comment.id === id
    });
    comment.status = status;

    await axios.post('http://localhost:4005/events', {
      type: "CommentUpdated",
      data: {
        id,
        postId,
        content,
        status
      }
    })
  }
  console.log("Received event", req.body.type)
  res.send({})
})

app.listen(4001, () => {
  console.log('Listening on 4001 Comment service');
});