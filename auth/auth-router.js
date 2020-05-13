const express = require("express")
const bcrypt = require("bcryptjs")
const userModel = require("../user/user-model")
const jwt = require("jsonwebtoken")

const router = express.Router()


router.post("/register", async (req, res, next) => {   
    
    try{
        const { username, password, department } = req.body
        const user = await userModel.findBy({username}).first()
        if(user) {
            res.status(409).json({message: "Username is already taken"})
        } else {    
        
            const payload = {
                username: username,
                password: password,
                department: department
            }
            
            const user = await userModel.addUser(payload)
            res.status(201).json(user)
        }
    } catch(err) {
        next(err)
    }

})

router.post("/login", async (req, res, next) => {
    
    const authError = {
        message: "Invalid Credentials"
    }

    try{
        const { username, password } = req.body
        const user = await userModel.findBy({username}).first()

        if(!user)
          res.status(401).json(authError)       
       
        validPassword = await bcrypt.compare(password,user.password)
        if(!validPassword)
          res.status(401).json(authError)
       
       const tokenPayload = {
           user_id: user.id,
           department: user.department
       }

       // this sends the token back as a cookie instead of in the request body,
	   // so the client will automatically save it in its cookie jar.
       res.cookie("token", jwt.sign(tokenPayload, process.env.JWT_SECRET))

        res.json({message:`Welcome ${username}`})
        
    } catch(err) {
        next(err)
    }
})


module.exports =  router
