var queryString = require('querystring');


const parseCookies = (req, res, next) => {
  // console.log(req.headers);
  // console.log(req.headers['cookie']);
  //let cookies = req.headers['cookie'].split(';');
  req.cookies = {}; 
  if (req.headers.hasOwnProperty('cookie')) {
    let cookiesArray = req.headers['cookie'].split('; ');
    cookiesArray.forEach(function(cookie) {
      let cookieValue = queryString.parse(cookie);
      req.cookies[Object.keys(cookieValue)[0]] = cookieValue[Object.keys(cookieValue)[0]];
    });
  }
  next();
};

module.exports = parseCookies;