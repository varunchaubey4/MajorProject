const express = require('express');
const passport = require('passport');
const router = express.Router();

const users_controller = require('../controllers/users_controller');

router.get('/profile/:id', passport.checkAuthentication, users_controller.profile);
router.post('/update/:id', passport.checkAuthentication, users_controller.update);
router.get('/sign-up', users_controller.signUp);
router.get('/sign-in', users_controller.signIn);
router.post('/create', users_controller.create); 
router.post('/create-session', passport.authenticate(
    'local',
    {failureRedirect: '/users/sign-in'}
),users_controller.createSession);
router.get('/sign-out', users_controller.destroySession);

router.get('/auth/google', passport.authenticate('google', {scope: ['profile', 'email']}));
router.get('/auth/google/callback', passport.authenticate('google', {failureRedirect: 'users/sign-in'}), users_controller.createSession);

module.exports = router;