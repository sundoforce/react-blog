const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');

const api = require('./api');

const app = new Koa();
const router = new Router();

// 라우터 설정
router.use('/api', api.routes()); // api 라우트 적용

// 라우터 적용 전에 bodyParser 적용
app.use(bodyParser());

// app 인스턴스에 라우터 적용
app.use(router.routes()).use(router.allowedMethods());


// https.createServer(options, (req, res) => {
//   res.writeHead(200);
//   res.end('hello world\n');
//   console.log('listening to port 4000');
//
// }).listen(4000);

// app.listen(4000, () => {
//     console.log('listening to port 4000');
// });


const https = require('https');

const options = {
  hostname: 'react.qooo.io',
  key: fs.readFileSync('/etc/letsencrypt/archive/react.qooo.io/fullchain2.pem'),
  cert: fs.readFileSync('/etc/letsencrypt/live/react.qooo.io/fullchain.pem'),
  port: 443,
  path: '/',
  method: 'GET'
};
console.log('listening to port 4000');


const req = https.request(options, (res) => {
  console.log('statusCode:', res.statusCode);
  console.log('headers:', res.headers);
  console.log('listening to port 4000');
  console.log('listening to port 4000');
  console.log('listening to port 4000');
  console.log('listening to port 4000');

  res.on('data', (d) => {
    process.stdout.write(d);
  });
});

req.on('error', (e) => {
  console.error(e);
});
req.end();