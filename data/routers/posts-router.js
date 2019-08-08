const router = require('express').Router();

const Data = require('../db');


//GET post
router.get('/', (req, res) => {
    Data.find()
    .then(post => {
        res.status(200).json(post)
    })
    .catch(error => {
        res.status(500).json({ message: "Couldn't retrieve Posts"})
    })
});
//Get Id Post
router.get('/:id', (req, res) => {
    const postId = req.params.id;
    const postData = req.body;

    Data.findById(postId)
    .first()
    .then(post => {
        if(post){
            res.status(201).json(Created)
        } else {
            res.status(404).json({ message: "Post Id Invalid"})
        }
    })
    .catch(error => {
        res.status(400).json({ message: "Couldn't retrieve Posts"})
    })
});

//Post new post

router.post('/', (req, res) => {
    const {title, contents}= req.body;
    if (!title || !contents) {
        res.status(400).json({ message:"PLease Enter required Fields"})
    } else{
        Data.insert({title, contents})
        .then(post => {
            res.status(200).json(post);
        })
        .catch(error => {
            res.status(500).json({message:"Sorry You Fucked Up"})
        })
    }
});
//Update
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const {title, contents}= req.body;
    if(!title || !contents) {
        res.status(400).json({ message:"PLease Enter required Fields"})
    } else{
        Data.update(id,{title, contents})
        .then(updated => {
            if(updated) {
                res.status(200).json(updated);
            } else {
                res.status(404).json({message:"user is imaginary"})
            }
        })
        .catch(error => {
            res.status(500).json({message:"Sorry You Fucked Up"})
        })
}});
//Delete
router.delete('/:id', (req, res) => {
    const postId = req.params.id;
    Data.remove(postId)
    .then(post => {
        if(post) {
            res.status(200).json({message:"Post has been Deleted"});
        } else {
            res.status(404).json({message: "Post is imaginary"})
        }
    })
    .catch(error => {
        res.status(500).json({message:"Error"})
    });
});
module.exports = router;