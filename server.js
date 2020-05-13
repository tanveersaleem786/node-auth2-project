const express = require("express")
const cookieParser = require("cookie-parser")
const userRouter = require("./user/user-router")
const authRouter = require("./auth/auth-router")

const server = express()
server.use(express.json())
server.use(cookieParser())
server.use("/api", userRouter)
server.use("/api", authRouter)



server.use((req, res, next) => {
    res.status(404).json({message:"Route not found"})
})

server.use((err, req, res, next) => {
    res.status(500).json({message:"Something went wrong"})
})

module.exports = server