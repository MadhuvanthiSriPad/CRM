const jwt = require("jsonwebtoken");

// const authenticateUser = (req, res, next) => {
//   {
//     // console.log("hola");
//     const authHeader = req.headers['authorization']

//     const token = req.headers.authorization.split(" ")[1];
//     console.log(token);
//     const decodedToken = jwt.verify(token, "abc", (err,verfiedJwt)=>{
//       if(err){
//         res.send(err.message)
//       }else{
//         res.send(verfiedJwt)
//       }
//     });
//     req.userData = { 
//       email: decodedToken.email,
//        userId: decodedToken.userId };
//     console.log(token,decodedToken,email,userId);
//     next();
//   } 
// };
function authenticateUser(req, res, next) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  if (token == null) return res.sendStatus(401)

  jwt.verify(token,"abc", (err, user) => {
    console.log(user)
    if (err) return res.sendStatus(403)
    req.user = { 
          email: user.email,
           userId: user._id };
           
    next();
  })
  
}
module.exports = authenticateUser;
