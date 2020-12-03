// 이 파일에서만 no-global-assign ESLint 옵션을 비활성화합니다
/* eslint-disable no-global-assign */

require = require('esm')(module /*, options*/);
module.exports = require('./main.js');


// TODO  22.10.2 포스트 역순으로 불러오기 
// ##### 졸림 ##########
// https://thebook.io/080203/ch22/10/02/