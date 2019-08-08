const express = require('express');

const postRouter = require('./data/routers/posts-router');

const commentRouter = require('./data/routers/comments-routers');

const server = express();

server.use(express.json());

server.use('/api/posts', postRouter);

server.use('/api/posts', commentRouter);

server.listen(8000, () => console.log('\nAPI running\n'));