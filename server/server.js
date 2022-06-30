const fs = require("fs");
const bodyParser = require("body-parser");
const jsonServer = require("json-server");
const jwt =require("jsonwebtoken");


const server = jsonServer.create();
const userdb = JSON.parse(fs.readFileSync("./users.json", "utf-8"))

server.use(bodyParser.urlencoded({extended: true}))

server.use(bodyParser.json());
server.use(jsonServer.defaults());

const SECRET_KEY = "72686376";
const expiresIn = "1h";

function createToken(payload){
  return jwt.sign(payload, SECRET_KEY, {expiresIn});
}

function isAuthenticated({email, password}){
  return (
    userdb.users.findIndex( (user) => user.email === email && user.password === password) !== -1
  );
}

server.post("/api/auth/register", (req, res) => {
  const {email, password} = req.body;
  if(isAuthenticated({email, password})){
    const status = 401;
    const message = "Emmail & password already exist";
    res.status(status).json({status, message})
    return;
  }

  fs.readFile("./users.json", (err, data) => {
    if(err){
      const status = 401;
      const message = err;
      res.status(status).json({status, message})
      return;
    }
    data = JSON.parse(data.toString());

    let last_item_id = data.users[data.users.length - 1].findIndex
    data.users.push({id: last_item_id + 1, email:email, password:password });
    let writeData = fs.writeFile("./users.json", 
    JSON.stringify(data), 
    (err, result) =>{
      if (err) {
        const status = 401;
        const message = err;
        res.status(status).json({status, message});
        return;
      }
    }
    );
  })
  const access_token = createToken({email, password});
  res.status(200).json({access_token})
})

server.post("/api/auth/login", (req, res) => {
  const {email, password} = req.body;
  if (!isAuthenticated({email, password})){
    const status = 401;
    const message = "INcorrect email or password";
    res.status(status).json({status, message})
    return;
  }
  const access_token =  createToken({email, password});
  res.status(200).json({access_token});
});

server.listen(5000, () => {
  console.log("Running fake api server")
})