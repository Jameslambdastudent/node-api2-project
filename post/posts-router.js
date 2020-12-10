const express = require('express')
const posts = require('./post-module')


const router = express.Router()

router.post('/posts', (req, res) => {
    if (!req.body.title || !req.body.contents) {
        return res.status(400).json({message: "Missing Title Or Content"})
    }
    posts.insert(req.body)
    .then((post) => {
        res.status(201).json(post)
    })
    .catch((err) => {
        res.status(500).json({message: "Err Adding Post"})
    })
})

router.post('/posts/:id/comments', (req, res) =>{
   if(!req.body.text) {
       return res.status(400).json({message: "Need A Text Vaule"})
   } 
   posts.insertComment(req.params.id, req.body)
   .then((post) => {
       res.status(201).json(post)
   })
   .catch((err) => {
       console.log(err)
       res.status(500).json({message: "Cound Not add Comment"})
   })
})

router.get('/posts', (req, res) => {
    posts.find()
    .then((posts) => {
        res.status(201).json(posts)
    })
    .catch((err) => {
        console.log(err)
        res.status(500).json({message: "Err"})
    })
})

router.get('/posts/:id', (req, res) => {
    posts.findById(req.params.id)
    .then((post) => {
    if(post) {
        res.status(200).json(post)
    } else {
        res.status(400).json({message: "Post Hiding In Database"})
    }
})
.catch((err) => {
    console.log(err)
    res.status(500).json({message: "Err"})
})
    
})

router.get('/posts/:id/comments', (req, res) => {
    posts.findPostComments(req.params.id)
    .then((comments) => {
        res.json(comments)
    })
    .catch((err) => {
        console.log(err)
        res.status(500).json({message: "Dont See No Comments"})
    })
}) 

router.put('/posts/:id', (req, res) => {
    if(!req.body.title || !req.body.contents) {
        return res.status(400).json({message: "Missing Title Or Contents"})
    }
    posts.update(req.params.id, req.body)
    .then((post) => {
     if (post) {
         res.status(200).json(post)

     } else{
         res.status(400).json({message: "The Post Cant Update"})
     }
     })
     .catch((err) => {
         console.log(err)
         res.status(500).json({message: " Err"})
     })
})

router.delete('/posts/:id', (req, res) => {
    posts.remove(req.params.id)
    .then((count) => {
        if(count > 0) {
            res.status(200).json({message: "Post Has Been Deleted"})
        } else {
            res.status(400).json({message: "Post Cant Be Found"})
        }
    })
    .catch((err) => {
        console.log(err)
        res.status(500).json({message: "Err"})
    })
})









module.exports = router