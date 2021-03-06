// =======================
// get the packages we need ============
// =======================
const express     = require('express');
const app         = express();
const db          = require('./config/db');
const bodyParser  = require('body-parser');
const morgan      = require('morgan');
let corser      = require('corser');

const jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens
const config = require('./config/config.js'); // get our config file

// =======================
// configuration =========
// =======================
const port = process.env.PORT || 8080; // used to create, sign, and verify tokens
app.set('superSecret', config.secret); // secret constiable

// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// use morgan to log requests to the console
app.use(morgan('dev'));

// =======================
// middlewares ===========
// =======================
//Handle CORS OPTIONS request
app.use(corser.create());

// =======================
// routes ================
// =======================

// basic route
app.get('/', function(req, res) {
    res.send('Hello! The API is at http://localhost:' + port + '/api/v1/login');
});

// get an instance of the router for api routes
const apiRoutes = express.Router();

// route middleware to verify a token
apiRoutes.use(function(req, res, next) {
    //Exclude login and register routes
  if(req.url != '/api/v1/user/login' && req.url != "/api/v1/user/register") {

      // check header or url parameters or post parameters for token
      const token = req.body.token || req.query.token || req.headers['x-access-token'];

      // decode token
      if (token) {

          // verifies secret and checks exp
          jwt.verify(token, app.get('superSecret'), function(err, decoded) {
              if (err) {
                  return res.json({ success: false, message: 'Failed to authenticate token.' });
              } else {
                  // if everything is good, save to request for use in other routes
                  req.decoded = decoded;
                  next();
              }
          });

      } else {

          // if there is no token
          // return an error
          return res.status(403).send({
              success: false,
              message: 'No token provided.'
          });
      }
  }else{
     next();
  }
});


// apply the routes to our application with the prefix /api
app.use('/api/v1', apiRoutes);




// =======================
// start the server ======
// =======================
app.listen(port);
console.log('Magic happens at http://localhost:' + port);
