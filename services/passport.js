const passport = require('passport');
const mongoose = require('mongoose');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const keys = require('../config/keys');

const User = mongoose.model('users');

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
        done(null, user);
    });
});

async function GoogleStrategyCallback(accessToken, refreshToken, profile, done) {
    const existingUser = await User.findOne({ googleID: profile.id });
    if (existingUser) {
        done(null, existingUser);
    } else {
        const user = await new User({ googleID: profile.id, name: profile.displayName  }).save();
        done(null, user);
    }
}

async function FacebookStrategyCallback(accessToken, refreshToken, profile, done) {
    const existingUser = await User.findOne({ facebookID: profile.id });
    if (existingUser) {
        done(null, existingUser);
    } else {
        const user = await new User({ facebookID: profile.id, name: profile.displayName  }).save();
        done(null, user);
    }
}

passport.use(
    new GoogleStrategy({
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret,
        callbackURL: '/auth/google/callback',
        proxy: true
    }, GoogleStrategyCallback)
);

passport.use(
    new FacebookStrategy({
        clientID: keys.facebookAppID,
        clientSecret: keys.facebookAppSecret,
        callbackURL: '/auth/facebook/callback',
        proxy: true
    }, FacebookStrategyCallback)
);