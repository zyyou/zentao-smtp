'use strict';
const bcklib = require('bcklib');
const auth = require('auth-smtp');
const crypto = require('crypto');

const config = bcklib.config.load();

exports.login = async (email, password) => {
    if (!email || !password || email.length <= 0 || password.length <= 0 || email.split('@').length != 2) {
        return bcklib.retMsg(true, '邮箱或密码不正确', undefined, bcklib.retCode.paramErr);
    }

    let res = await auth.login(email, password, config.smtp.host, config.smtp.port);
    if (res.hasErr) {
        return res;
    }

    //http://www.zentao.net/api.php?m=user&f=apilogin&account=account&code=freepasswd&time=timestamp&token=token
    //token：算法为：code、应用密钥、time()字符串合并，再进行 md5 加密。
    let userName = email.split('@')[0];
    let timestamp = parseInt(Date.now() / 1000);
    let md5 = crypto.createHash('md5');
    let token = md5.update(`${config.zentao.code}${config.zentao.key}${timestamp}`).digest('hex');
    let url = `${config.zentao.url}/api.php?m=user&f=apilogin&account=${userName}&code=${config.zentao.code}&time=${timestamp}&token=${token}`;

    return bcklib.retMsg(false, 'ok', url);
}