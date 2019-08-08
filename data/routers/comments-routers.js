const router = require('express').Router();
const Data = require('../db');

//Get Comments
router.get('/:id/comments', (req, res) => {
    const postId = req.params.id;
    Data.findPostComments(postId)
    .then(post => {
        res.status(200).json(post)
    })
    .catch(error => {
        res.status(500).json({ message: "Couldn't retrieve Comments"})
    })
});

//Post Comments
router.post('/:id/comments', (req, res) => {
    const postId = req.params.id;
    console.log('Id Found', postId)
    const {text}= req.body;
    console.log('this body', req.body)
    Data.findById(postId)
    .first()
    .then(post => {
        console.log("Post?", post)
        if(!post) {
            res.status(400).json({ message:"Post does not exist"})
        }else if (!text) {
            res.status(400).json({ message:"PLease Enter required Fields"})
        } else{
            Data.insertComment(req.body)
             .then(comments => {
                res.status(200).json({message:"It worked"});
            })
            .catch(error => {
                res.status(500).json({message:"Sorry We Fucked Up"})
             })
        }
    })
    .catch(error => {
        res.status(500).json({message:"Get by ID error"})
    })
    
});
module.exports = router;