const express = require('express');
const router = express.Router();
const zod = require("zod");
const { User, Account } = require('../db');
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require('../config');
const { authMiddleware } = require('../middleware');


//Signup Route

//input validation using zod
const signupBody = zod.object({
    username: zod.string().email(),
    firstName: zod.string(),
    lastName: zod.string(), 
    password: zod.string()
})


router.post("/signup", async (req, res) => {
    //Input validation check
    const { success } = signupBody.safeParse(req.body)
    if (!success) {
        return res.status(411).json({
            message: "Input specified in Incorrect format"
        })
    }

    //existing user check
    const existingUser = await User.findOne({
        username: req.body.username
    })

    if (existingUser) {
        return res.status(411).json({
            message: "Exisiting user"
        })
    }



    //Note: Email verification is still left which happen nowadays in every website. 


    //When both of the checks are successfull than adding them to database
    const user = await User.create({
        username: req.body.username,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: req.body.password
    })



    const userId = user._id;

    await Account.create({
        userId,
        balance: 1 + Math.random() * 10000
    })

    const token = jwt.sign({
        userId
    }, JWT_SECRET);

    res.json({
        message: "User created successfully",
        token: token
    })
})


//Signin Route

//Input validation check using zod
const signinbody = zod.object({
    username: zod.string().email(),
    password: zod.string()
})

router.post("/signin", async (req, res) => {

    //Input validation
    const { success } = signinbody.safeParse(req.body);
    if (!success) {
       return  res.status(411).json({
            message: "Input specified in Incorrect format"
        })
    }

    const test_user = await User.findOne({
        username: req.body.username
    })

    if (!test_user) {
        res.status(411).json({
            message: "Not a registered user!"
        })
    }

    //Userid and Passowrd authetication
    const user = await User.findOne({
        username: req.body.username,
        password: req.body.password
    });

    if (user) {
        const token = jwt.sign({
            userId: user._id
        }, JWT_SECRET);

        res.status(200).json({
            message: "Welcome User, You are logged in",
            token: token
        })

        return;
    }

    res.status(411).json({
        message: "Password Incorrect"
    })



})

//Updation Route

const updateBody = zod.object({
    password: zod.string().optional(),
    firstName: zod.string().optional(),
    lastName: zod.string().optional()
})

router.put("/", authMiddleware, async (req, res) => {
    const { success } = updateBody.safeParse(req.body)

    if (!success) {
        return res.status(411).json({
            message: "Error while updating information"
        })
    }

    await User.updateOne({ _id: req.userId }, req.body);

    res.json({
        message: "Updated Successfully"
    })
})

//Route to send the details of the users to appear on the user's page according to searching
router.get("/bulk", async (req, res) => {
    const filter = req.query.filter || "";

    const users = await User.find({
        $or: [{
            firstName: {
                "$regex": filter
            }
        }, {
            lastName: {
                "$regex": filter
            }
        }]
    })

    res.json({
        user: users.map(user => ({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    })
})





module.exports = router;

