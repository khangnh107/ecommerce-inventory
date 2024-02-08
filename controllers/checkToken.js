exports.checkToken = (req, res, next) => {
  if (req.cookies.access_token !== undefined) {
      const bearer = req.cookies.access_token.split(' ');
      const token = bearer[1];

      req.token = token;
      next();
  } else {
      // If header is undefined, then return Forbidden (403)
      res.sendStatus(403)
  }
}

// The verify function below is used if you want to verify JWT token from the authorization header instead of cookies

// exports.checkToken = (req, res, next) => {
//   const header = req.headers['authorization'];

//   if (typeof header !== 'undefined') {
//       const bearer = header.split(' ');
//       const token = bearer[1];

//       req.token = token;
//       next();
//   } else {
//       // If header is undefined, then return Forbidden (403)
//       res.sendStatus(403)
//   }
// }