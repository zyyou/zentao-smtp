'use strict';
const mvcrouter = require('koa-mvcrouter');
const user = require('../bll/user');

//index controller中建议只写此action
mvcrouter.viewGET('/', function (ctx) {
  return {
    title: '登录'
  };
});

mvcrouter.viewPOST('/', async function (ctx) {
  let email = ctx.request.body.email;
  let password = ctx.request.body.password;

  let res = await user.login(email, password);
  if (res.hasErr) {
    res.title = '不可用';
    res.view = 'error';
    return res;
  }

  return ctx.redirect(res.data);
});

module.exports = mvcrouter;