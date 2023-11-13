var fetchuser = require('../middleware/fetchuser')
const express = require("express");
const router = express.Router();
const UserModel = require("../models/User.js");
const BlogModel = require('../models/Blog');
const mongoose = require("mongoose");
var ObjectId = mongoose.Types.ObjectId;
router.get('/allusers', async (req, res) => {
  try {
      const allusers = await UserModel.find({});
      res.json(allusers);
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server error in Fetching all the Blogs' });
  }

})
router.post("/userByUserId/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const foundUser = await UserModel.findOne({ _id: id});

    if (foundUser) {
      // console.log(foundUser)
      res.json(foundUser );
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Follow or unfollow a user
router.patch('/toggle-follow/:userId', fetchuser, async (req, res) => {
  const { userId } = req.params;
  const currentUserId = req.user.id;
// console.log(currentUserId,userId);
  try {
    // Check if the user to follow/unfollow exists
    const userToToggleFollow = await UserModel.findOne({_id:userId});
    const  currentUser= await UserModel.findOne({_id:currentUserId});

    if (!userToToggleFollow) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Check if the user is already following the target user
    const isFollowing = await userToToggleFollow.followers.includes(currentUserId);

console.log(isFollowing);
    if (isFollowing) {
      // Unfollow the user
      await currentUser.updateOne({ $pull: { followings: userId } });
      await userToToggleFollow.updateOne({ $pull: { followers: currentUserId } });

      res.json({ message: 'Successfully unfollowed the user',currentUserFollowings:currentUser.followings,userToToggleFollowFollowers:userToToggleFollow.followers });
    } else {
      // Follow the user
      await userToToggleFollow.updateOne({ $push: { followers: currentUserId } });
      await currentUser.updateOne({ $push: { followings: userId } });

      res.json({ message: 'Successfully followed the user',currentUserFollowings:currentUser.followings,userToToggleFollowFollowers:userToToggleFollow.followers  });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
router.get('/blogs-by-followings', fetchuser, async (req, res) => {
  try {
    // Get the user ID of the logged-in user
    const currentUserId = req.user.id;

    // Find the user document of the logged-in user
    const currentUser = await UserModel.findById(currentUserId);

    // Extract the array of user IDs that the current user is following
    const followingsUserIds = currentUser.followings;

    // Find blogs written by the users the current user is following
    const blogsByFollowings = await BlogModel.find({
      user: { $in: followingsUserIds },
    });

    res.json(blogsByFollowings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/top-users', async (req, res) => {
  try {
    // Find users, sort by followers in descending order, and limit the result to 5 users
    const topUsers = await UserModel.find().sort({ followers: -1 }).limit(5);

    res.json(topUsers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


router.patch("/updateUser/:id", async (req, res) => {
  const { id } = req.params;
  Users.findByIdAndUpdate(id, { $set: req.body }, (err, e) => {
    if (err) console.log(err);
    res.json({ success: e });
  });
});

router.put('/updateuser/:id', fetchuser, async (req, res) => {
  const { name, university, degree, major, skills, github, about_yourself, instagram, twitter, facebook, linkedin } = req.body;

  try {
    // Create a newUserInfo object
    const newUserInfo = {};
    if (name) newUserInfo.name = name;
    if (university) newUserInfo.university = university;
    if (degree) newUserInfo.degree = degree;
    if (major) newUserInfo.major = major;
    if (skills) newUserInfo.skills = skills;
    if (github) newUserInfo.github = github;
    if (about_yourself) newUserInfo.about_yourself = about_yourself;
    if (instagram) newUserInfo.instagram = instagram;
    if (twitter) newUserInfo.twitter = twitter;
    if (facebook) newUserInfo.facebook = facebook;
    if (linkedin) newUserInfo.linkedin = linkedin;

    // Find the user to be updated and update their information
    let user = await UserModel.findById(req.params.id);
    if (!user) return res.status(404).send("User not found for updating");

    // Ensure that the user making the request is the owner of the profile
    if (user._id.toString() !== req.user.id) {
      return res.status(401).send("Not allowed to update this user");
    }

    user = await UserModel.findByIdAndUpdate(req.params.id, { $set: newUserInfo }, { new: true });

    res.json({ user });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error in updating user");
  }
});


router.delete('/delete-account', fetchuser, async (req, res) => {
  try {
    // Find the authenticated user
    const user = await UserModel.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Delete the authenticated user
    await user.remove();

    res.json({ message: 'Account deleted successfully' });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Internal Server Error in deleting account' });
  }
});

router.get("/userscount", (req, res) => {
  UserModel.count(function (err, count) {
    // if there is an error retrieving, send the error. nothing after res.send(err) will execute
    if (err) res.send(err);

    res.json({ count: count }); // return return the count in JSON format
    // console.log(count)
  });
});

router.get("/search/author?", async (req, res) => {
  const { q } = req.query;
  await Users.find({ username: { $regex: q, $options: "$i" } })
    .then((data) => res.json(data))
    .catch((error) => res.json(error));
});

module.exports = router;
