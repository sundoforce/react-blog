const Koa = require('koa');
const app = new Koa();

app.use((ctx, next) => {
  if(ctx.query.authorized !== '1') {
    ctx.state = 401; // Unauthorized
    return;
  }
  next();
});

app.user((ctx, next) => {
  console.log(2);
  next();
})



// https://thebook.io/080203/ch21/03/02-03/

// app 인스턴스에 라우터 적용
app.use(ctx => {
  ctx.body = 'hello world';
});

app.listen(4000, () => {
  console.log('listening to port 4000');
});

