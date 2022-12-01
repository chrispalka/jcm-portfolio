const { Router } = require('express');
const passport = require('passport');
const path = require('path');
const crypto = require('crypto')
const { v4: uuidv4 } = require('uuid');
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');
const LocalStrategy = require('passport-local').Strategy;
const nodemailer = require('nodemailer');
const {
  getUserName,
  getIsAdmin,
  addUser,
  updateForgotPassword,
  updateUserPassword,
  findRegistrationByToken,
  generateNewRegistrationToken
} = require('../models/index.js');

const { isAuthenticated } = require('../modules/auth');

dotenv.config({ path: path.join(__dirname, '../.env') });

const router = Router();

// const headers = { "Access-Control-Allow-Origin": "*", 'Access-Control-Allow-Credentials': true }

router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

router.post('/login', passport.authenticate('local', {
  failureRedirect: '/login',
  failureFlash: true,
}), (req, res) => {
  res.send('Success');
});

router.get('/currentUser', (req, res) => {
  res.json(req.user[0].email);
});

passport.use(new LocalStrategy(
  {
    usernameField: 'email',
    passReqToCallback: true,
  },
  async (req, username, password, done) => {
    const user = await getUserName(username);
    if (user) {
      bcrypt.compare(password, user.dataValues.password, (error, check) => {
        if (error) {
          return done();
        }
        if (check) {
          return done(null, [{ email: user.dataValues.email }]);
        }
        return done(null, false);
      });
    } else {
      return done(null, false);
    }
  },
));

router.get('/isAdmin', async (req, res) => {
  if (req.user) {
    const { email } = req.user[0]
    try {
      const isAdmin = await getIsAdmin(email);
      if (isAdmin) {
        res.send(true)
      } else {
        res.send(false)
      }
    } catch (err) {
      console.log(err)
    }
  }
})

router.post('/register', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await getUserName(email);
    if (user) {
      res.send('Failure');
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      await addUser(uuidv4(), email, hashedPassword);
      res.send('Success');
    }
  } catch (err) {
    console.log(err);
  }
});

router.get('/logout', async (req, res, next) => {
  req.logout((err) => {
    if (err) {
      console.log(err)
      return next(err);
    }
    res.redirect('/');
  });
});

router.get('/isLoggedIn', async (req, res) => {
  res.json(isAuthenticated(req));
});

router.post('/forgotPassword', async (req, res) => {
  console.log(process.env.EMAIL_ADDRESS, process.env.EMAIL_PASSWORD)
  const { emailValue } = req.body;
  if (!emailValue) {
    res.json('Invalid');
  } else {
    const user = await getUserName(emailValue);
    if (user) {
      const token = crypto.randomBytes(20).toString('hex');
      await updateForgotPassword(user.dataValues.id, token, Date.now() + 360000);
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        name: 'www.gmail.com',
        auth: {
          user: process.env.EMAIL_ADDRESS,
          pass: process.env.EMAIL_PASSWORD,
        },
      });
      const mailOptions = {
        from: 'donkwizard@gmail.com',
        to: `${user.dataValues.email}`,
        subject: 'Your password reset link',
        text: 'You are receiving this message in response to your request to reset your password.\n\n'
          + 'Please click the following link or paste into your browser to complete the process (link expires within 1 hour).\n\n'
          + `http://donkwizard.net/resetpassword/${token}\n\n`
          + 'If you did not request this, please ignore and your password will remain unchanged\n',
      };
      transporter.sendMail(mailOptions, (err, response) => {
        if (err) {
          console.log(err);
        } else {
          console.log(response);
          res.status(200);
        }
      });
    }
  }
});

router.get('/reset', async (req, res) => {
  const oneHour = 60 * 60 * 1000;
  const { resetPasswordToken } = req.query;
  try {
    const user = await findUserByToken(resetPasswordToken);
    if (user && (Date.now() - user.dataValues.resetpasswordexpires < oneHour)) {
      res.status(200).send({
        email: user.dataValues.email,
      });
    } else {
      res.json(false);
    }
  } catch (e) {
    console.log(e);
  }
});

router.get('/confirmNewRegistrationToken', async (req, res) => {
  const { registrationToken } = req.query;
  try {
    const registration = await findRegistrationByToken(registrationToken);
    if (registration) {
      res.status(200).send('Found');
    } else {
      res.status(200).send('Not Found')
    }
  } catch (e) {
    console.log(e);
  }
});

router.get('/newRegistrationToken', async (req, res) => {
  try {
    const token = crypto.randomBytes(20).toString('hex');
    const tokenGen = await generateNewRegistrationToken(token, Date.now(), Date.now())
    res.status(200).send(token)
  } catch (e) {
    console.log(e)
  }
})

router.post('/updatePasswordFromEmail', async (req, res) => {
  const { email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await updateUserPassword(email, hashedPassword);
  } catch (e) {
    console.log(e);
  }
});

router.put('/deleteWebhook', async (req, res) => {
  if (req.user) {
    const { email } = req.user[0];
    try {
      const user = await getUserName(email);
      await deleteWebhook(user.dataValues.id);
      res.status(200).json('Success')
    } catch (e) {
      console.log(e)
    }
  }
});

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

module.exports = router;
