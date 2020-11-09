const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jsonwt = require("jsonwebtoken");
const passport = require("passport");
const key = require("../../setup/myurl");
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(
  "204747813298-4a065sn8m1rdgo2gq2n4gtmab8mg193l.apps.googleusercontent.com"
);

//@type GET
//@route /api/auth
//@desc just for testing
//@access PUBLIC
router.get("/", (req, res) => res.json({ test: "Auth is being tested" }));

//Import Schema for Person to Register
const Person = require("../../models/Person");

//@type POST
//@route /api/auth/register
//@desc route of registration for users
//@access PUBLIC

router.post("/register", (req, res) => {
  Person.findOne({ email: req.body.email })
    .then((person) => {
      if (person) {
        return res
          .status(400)
          .json({ emailerror: "Email is already registered in our system" });
      } else {
        const newPerson = new Person({
          name: req.body.name,
          email: req.body.email,
          password: req.body.password,
        });
        // Encrypt password using bcrypt
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newPerson.password, salt, (err, hash) => {
            if (err) throw err;
            newPerson.password = hash;
            newPerson
              .save()
              .then((person) => res.json(person))
              .catch((err) => console.log(err));
          });
        });
      }
    })
    .catch((err) => console.log(err));
});

//@type POST
//@route /api/auth/login
//@desc route for login of  users
//@access PUBLIC

router.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  Person.findOne({ email })
    .then((person) => {
      if (!person) {
        return res.status(404).json({ email: "Email not found" });
      }
      bcrypt
        .compare(password, person.password)
        .then((isCorrect) => {
          if (isCorrect) {
            //res.json({ authentiction: "Approved" });
            //use payload and create token for user
            const payload = {
              id: person.id,
              name: person.name,
              username: person.username,
            };
            jsonwt.sign(
              payload,
              key.secret,
              { expiresIn: 3600 },
              (err, token) => {
                res.json({
                  success: true,
                  token: "Bearer" + token,
                  //logged in user detail to show it on client side.
                  person: {
                    id: person.id,
                    name: person.name,
                    email: person.email,
                  },
                });
              }
            );
          } else {
            res.status(400).json({ passworderror: "Password is not correct" });
          }
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
});

//@type GET
//@route /api/auth/profile
//@desc route for user profile
//@access PRIVATE
router.get(
  "/profile",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    //console.log(req);
    res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email,
      profilepic: req.user.profilepic,
    });
  }
);

module.exports = router;
