const { Service } = require('egg');
class LoginSerbice extends Service {
    async login(userName, password) {
        const isHave = await this.app.mysql.get('ADTable', {
            ADname: userName,
        });
        //老师
        if (isHave) {
            if (isHave.ADpassword == password) {
                let tokens = this.app.jwt.sign({ userName, password }, '123456', {
                    expiresIn: '12h',
                });
                return {
                    code: 1,
                    rank: isHave.type,
                    msg: '登录成功',
                    token: tokens,
                };
            } else {
                return {
                    code: -1,
                    msg: '密码输入错误',
                };
            }
        } else {
            //学生
            const Isstudent = await this.app.mysql.get('student', {
                user_name: userName,
            });
            if (Isstudent) {
                let tokens = this.app.jwt.sign({ userName, password }, '123456', {
                    expiresIn: '12h',
                });
                return {
                    code: 1,
                    rank: Isstudent.type,
                    msg: '登录成功',
                    token: tokens,
                };
            } else {
                return {
                    code: -1,
                    msg: '登录失败，用户名不存在',
                };
            }
        }
    }
    async findpassword({ zhanghu, email }) {
        const findpassword = await this.app.mysql.get('ADTable', { ADname: zhanghu });
        if (findpassword) {
            if (findpassword.email == email) {
                return {
                    code: 1,
                    password: findpassword.ADpassword,
                    id: findpassword.uid,
                    msg: '验证正确',
                };
            } else {
                return { code: -1, msg: '邮箱与本账号不一致，重新输入' };
            }
        } else {
            return { code: -1, msg: '账户不存在，请重新输入' };
        }
    }
    async newPassword({ newpassword, id }) {
        const $sql = `UPDATE ADTable SET  ADpassword=?  WHERE uid=? `;
        const $params = [newpassword, id];
        const setNew = await this.app.mysql.query($sql, $params);
        if (setNew.affectedRows === 1) {
            return { code: 1, msg: '设置密码成功' };
        } else {
            return { code: -1, msg: '设置密码失败' };
        }
    }
}
module.exports = LoginSerbice;
