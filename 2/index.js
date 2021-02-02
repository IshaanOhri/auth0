const { auth } = require('express-openid-connect');
const express = require('express');

const app = express();

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: 'a long, randomly-generated string stored in env',
  baseURL: 'http://localhost:3000',
  clientID: 'H1gaelCePkw3XfiEQtYdQzvncqULo5vL',
  issuerBaseURL: 'https://papervit.us.auth0.com'
};

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));

// req.isAuthenticated is provided from the auth router
app.get('/', (req, res) => {
  res.send(req.oidc.isAuthenticated() ? `hello ${req.oidc.user.sub}` : 'Logged out');
});

app.get('/callback', (req, res) => {
    res.send({
        msg: 'callback'
    });
  });

  const { requiresAuth } = require('express-openid-connect');

app.get('/profile', requiresAuth(), (req, res) => {
  res.send(JSON.stringify(req.oidc.user));
});

  

app.listen(3000, () => {
    console.log('App listening on port 3000')
})