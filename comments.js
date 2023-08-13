// create web server 
const express = require('express');
const app = express();
// connect to database
const db = require('./db');
// get the model
const Comments = require('./models/comments');
// get the router
const commentsRouter = require('./routes/comments');
// use the router
app.use(commentsRouter);
// start the server
app.listen(3000, () => {
    console.log('Server started');
});
// create a comment
app.post('/comments', async (req, res) => {
    const comment = await Comments.create({
        name: 'John',
        message: 'Hello'
    });
    res.json(comment);
});
// read all comments
app.get('/comments', async (req, res) => {
    const comments = await Comments.findAll();
    res.json(comments);
});
// read a comment
app.get('/comments/:id', async (req, res) => {
    const comment = await Comments.findByPk(req.params.id);
    res.json(comment);
});
// update a comment
app.patch('/comments/:id', async (req, res) => {
    const comment = await Comments.findByPk(req.params.id);
    await comment.update({
        message: 'Hi'
    });
    res.json(comment);
});
// delete a comment
app.delete('/comments/:id', async (req, res) => {
    const comment = await Comments.findByPk(req.params.id);
    await comment.destroy();
    res.json(comment);
});
