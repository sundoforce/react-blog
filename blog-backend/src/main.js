require('dotenv').config();
import Koa from 'koa';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
import mongoose from 'mongoose';
import serve from 'koa-static';
import path from 'path';
import send from 'koa-send';

const cors = require('@koa/cors');

import api from './api';
import jwtMiddleware from './lib/jwtMiddleware';


// 비구조화 할당을 통하여 process.env 내부 값에 대한 레퍼런스 만들기
const { PORT, MONGO_URI, HOST } = process.env;

mongoose
  .connect(MONGO_URI, { 
    useNewUrlParser: true, 
    useFindAndModify: false,
    useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(e => {
    console.error(e);
  });


const cors = require('@koa/cors');

const app = new Koa();
app.use(cors());
const router = new Router();


// 라우터 설정
router.use('/api', api.routes()); // api 라우트 적용

// 라우터 적용 전에 bodyParser 적용
app.use(bodyParser());
app.use(jwtMiddleware);


// app 인스턴스에 라우터 적용
app.use(router.routes()).use(router.allowedMethods());


const buildDirectory = path.resolve(__dirname, '../../blog-frontend/build');
app.use(serve(buildDirectory));
app.use(async ctx => {
  // Not Found이고 , 주소가 /api로 시작하지 않는 경어 
  if (ctx.status === 404 && ctx.path.indexOf('/api') !== 0) {
    // index.html
    await send(ctx, 'index.html', { root: buildDirectory});
  }
})


// PORT 가 지정되어있지 않다면 4000 을 사용
const port = PORT || 4000;
const host = HOST || '0.0.0.0';

app.listen(port, () => {
  console.log(HOST)
  console.log('Host', host);
  console.log('Listening to port %d', port);
  
});