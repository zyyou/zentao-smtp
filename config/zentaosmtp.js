'use strict';

module.exports = {
    port: 10000,
    title: '项目管理系统',
    smtp: {
        tips: '请使用***邮箱账号及邮箱密码登录', //提示，用于显示到登录页面，例如：请使用***邮箱账号及邮箱密码登录
        host: 'mail.***.com', //SMTP服务器
        port: 25 //SMTP服务端口
    },
    zentao: {
        url: 'https://local.***.com/pm', //禅道地址，首页，不要带/
        code: 'smtplogin', //应用代号
        key: '533a7de******' //应用秘钥
    }
}