const express = require('express')
const postsRouter = require('./post/posts-router')

const server = express()
const port = process.env.PORT || 8000

server.use(express.json())
server.use(postsRouter)




server.get('/', (req, res) => {
    res.status(200).json({
        message: `Welcome ${process.env.COHORT}`,
        fact: process.env.FUN_FACT || `You Have No Fun Fact`
    })
})

server.listen(port, () => console.log(`Server Running Strong`))