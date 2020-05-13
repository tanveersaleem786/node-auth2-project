const express = require("express")
const restrict = require("../middleware/restrict")
const userModel = require("./user-model")

const router = express.Router()

router.get("/users", restrict(), async (req, res, next) => {
   
    try {
        const { department } = req.token
        const users = await userModel.getUsersByDept(department)
        res.json(users)
    } catch(err) {
        next(err)
    }

})

module.exports = router