const http = require('http');
const app = require('express')();
const middleware = require('./middleware');
// const baseData = require('./base.json');
const port = 4560;
const server = http.createServer(app);
const baseObj = require('./watchJson');
app.all('*',(req, res, next) =>{
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, ADMIN-ACCESSTOKEN, Access-Control-Allow-Credentials');
  res.header('Access-Contrl-Allow-Credentials', 'true'); 
  next();
});
app.use(middleware(baseObj));
server.listen(port, () =>{
  console.log(`server is runner at ${port}`);
});
server.on('error', (err) =>{
  console.log(err);
});
server.on('close', () =>{
  console.log(' server was end');
});