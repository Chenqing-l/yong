const context = require.context('./module', false, /\.(js|ts)$/);
//引入每一个store的文件规范
const getModel = context.keys().map(key => context(key));

export function createModel(app) {
    //根据传进来的APP进行循环加入
    return getModel.map(key => app.model(key.default));
}
