const models = require('../models');
const Promise = require('bluebird');

module.exports.createSession = (req, res, next) => {
  models.Sessions.create(req.body.password)
  .then((result)=>{
    var sessionObject = {};
    sessionObject['id'] = result.insertId;
    models.Sessions.get(sessionObject)
    .then((result)=>{
      req.session = result;
      // console.log("It gets inside the sessions get", result);
      let resultObject = {value: result['RowDataPacket']};
      res.cookies = {};
      res.cookies['shortlyid'] = {};
      res.cookies['shortlyid'].value = result;
      next();
    })
    .catch((err)=>{
      
      console.log("This shouldn't hit, there must be an error", err);

      next();
    });
  }).catch(()=>{
    next();
  });
  // console.log(models.Users.get(req.body.username));
  //the first thing we need theck is, is legit to creat a new session?
  //if it is not legit. than redirect the user to the login page

  //



  res.redirect('/');
};

/************************************************************/
// Add additional authentication middleware functions below
/************************************************************/

module.exports.createUser = (req, res, next) => {
  models.Users.create(req.body)
  .then(()=>{
    res.redirect('/');
  }).catch(()=>{
    res.redirect('/signup');
  });

};

module.exports.isLoggedIn = (req, res, next)=> {
  if (false) {
    next();
  } else {
    res.redirect('login');
  }
};

module.exports.tryLogin = (req, res, next) => {
  var usersObject = {};
  usersObject['username'] = req.body['username'];
  models.Users.get(usersObject)
  .then((result)=> {
    if (result) {
      //we need to ensure that the password we have
      //is equal to the password already saved
      if (models.Users.compare(req.body.password, result.password, result.salt)) {
        res.redirect('/');
      } else {
        res.redirect('/login');
      }
    } else {
      res.redirect('/login');
    }
  });
};
