const express = require('express')
const postsRouter = require('./post/posts-router')

const server = express()
const PORT = 8000

server.use(express.json())
server.use(postsRouter)




server.get('/', (req, res) => {
    res.status(200).json({message: "Server Up"})
})

server.listen(PORT, () => console.log(`Server Running Strong`))