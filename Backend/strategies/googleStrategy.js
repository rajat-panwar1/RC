const passport = require("passport");

const GoogleStrategy = require("passport-google-oauth2").Strategy;

passport.use(new GoogleStrategy({}));