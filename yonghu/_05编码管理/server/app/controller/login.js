const { Controller } = require('egg');
class LoginModule extends Controller {
    async login() {
        const { ctx } = this;
        let { userName, password } = ctx.request.body;
        let backFlag = await ctx.service.login.login(userName, password);
        ctx.cookies.set('token', backFlag.token);
        ctx.body = backFlag;
    }
    async findpassword() {
        const { ctx } = this;
        ctx.body = await ctx.service.login.findpassword(ctx.request.body);
    }
    async newPassword() {
        const { ctx } = this;
        ctx.body = await ctx.service.login.newPassword(ctx.request.body);
    }
}
module.exports = LoginModule;
