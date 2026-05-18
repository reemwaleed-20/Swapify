const express = require("express");

const router = express.Router();

const bcrypt = require("bcryptjs");

const User = require("../models/User");

router.post("/register", async (req, res) => {

    try {

        const { name, email, password } = req.body;

        const existingUser = await User.findOne({ email });

        if (existingUser) {

            return res.status(400).json({
                message: "User already exists"
            });

        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            name,
            email,
            password: hashedPassword
        });

        await user.save();

        res.status(201).json({
            message: "User registered successfully"
        });

    } catch (error) {

        res.status(500).json({
            message: "Server Error"
        });

    }

});
router.post("/add-skill", async (req, res) => {

    try {

        const { email, skill } = req.body;

        const user = await User.findOne({ email });

        if (!user) {

            return res.status(404).json({
                message: "User not found"
            });

        }

        if (!user.skillsTeach.includes(skill)) {
    user.skillsTeach.push(skill);
}

        await user.save();

        res.status(200).json({
            message: "Skill added successfully",
            skills: user.skillsTeach
        });

    } catch (error) {

        res.status(500).json({
            message: "Server Error"
        });

    }

});

router.post("/login", async (req, res) => {

    try {

        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {

            return res.status(400).json({
                message: "User not found"
            });

        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {

            return res.status(400).json({
                message: "Invalid password"
            });

        }

        res.status(200).json({
            message: "Login successful",
            user
        });

    } catch (error) {

        res.status(500).json({
            message: "Server Error"
        });

    }

});
router.post("/search-skill", async (req, res) => {

    try {

        const { skill } = req.body;

        const users = await User.find({
            skillsTeach: skill
        });

        res.status(200).json(users);

    } catch (error) {

        res.status(500).json({
            message: "Server Error"
        });

    }

});
router.post("/add-learn-skill", async (req, res) => {

    try {

        const { email, skill } = req.body;

        const user = await User.findOne({ email });

        if (!user) {

            return res.status(404).json({
                message: "User not found"
            });

        }

        if (!user.skillsLearn.includes(skill)) {
            user.skillsLearn.push(skill);
        }

        await user.save();

        res.status(200).json({
            message: "Learning skill added",
            skillsLearn: user.skillsLearn
        });

    } catch (error) {

        res.status(500).json({
            message: "Server Error"
        });

    }

});
router.post("/find-matches", async (req, res) => {

    try {

        const { skill } = req.body;

        const matchedUsers = await User.find({
            skillsTeach: skill
        });

        res.status(200).json(matchedUsers);

    } catch (error) {

        res.status(500).json({
            message: "Server Error"
        });

    }

});
router.post("/update-credits", async (req, res) => {

    try {

        const { email, action } = req.body;

        const user = await User.findOne({ email });

        if (!user) {

            return res.status(404).json({
                message: "User not found"
            });

        }

        if (action === "teach") {

            user.credits += 10;

        } else if (action === "learn") {

            user.credits -= 10;

        }

        await user.save();

        res.status(200).json({
            message: "Credits updated",
            credits: user.credits
        });

    } catch (error) {

        res.status(500).json({
            message: "Server Error"
        });

    }

});
router.post("/rate-user", async (req, res) => {

    try {

        const { email, rating } = req.body;

        const user = await User.findOne({ email });

        if (!user) {

            return res.status(404).json({
                message: "User not found"
            });

        }

        user.rating = rating;

        await user.save();

        res.status(200).json({
            message: "Rating updated",
            rating: user.rating
        });

    } catch (error) {

        res.status(500).json({
            message: "Server Error"
        });

    }

});
router.post("/delete-skill", async (req, res) => {

    try {

        const { email, skill } = req.body;

        const user = await User.findOne({ email });

        if (!user) {

            return res.status(404).json({
                message: "User not found"
            });

        }

        user.skillsTeach = user.skillsTeach.filter(
            (item) => item !== skill
        );

        await user.save();

        res.status(200).json({
            message: "Skill deleted",
            skills: user.skillsTeach
        });

    } catch (error) {

        res.status(500).json({
            message: "Server Error"
        });

    }

});
module.exports = router;