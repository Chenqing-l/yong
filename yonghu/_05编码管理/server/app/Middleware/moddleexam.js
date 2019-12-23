module.exports = options => {
    return async function lanjie(ctx, next) {
        if (ctx.request.url == '/login') {
            await next();
        } else {
            if (ctx.request.header.cookie) {
                await next();
            } else {
                ctx.body = {
                    code: -1,
                    status: 401,
                    msg: '您没有权限访问',
                };
            }
        }
    };
};
