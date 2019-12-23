'use strict';

const Controller = require('egg').Controller;

class homeController extends Controller {
    //用户查找
    async lookAllUser() {
        const result = await this.ctx.service.app.lookAllUser();
        if (result.length) {
            this.ctx.status = 200;
            this.ctx.body = {
                code: 1,
                msg: '请求数据成功',
                result,
            };
        } else {
            this.ctx.status = 500;
            this.ctx.body = {
                code: 0,
                msg: '请求数据失败',
            };
        }
    }
    //查找用户视图
    
    //添加学生管理
    async students() {
        const result = await this.ctx.service.app.students(this.ctx.query);
        if (result.affectedRows && result.affectedRows > 0) {
            this.ctx.status = 200;
            this.ctx.body = {
                code: 1,
                msg: '添加成功',
            };
        } else {
            this.ctx.status = 500;
            this.ctx.body = {
                code: 0,
                msg: '添加失败',
            };
        }
    }
    //查看用户身份
    async lookAllUsers() {
        const result = await this.ctx.service.app.lookAllUsers();

        if (result.length) {
            this.ctx.status = 200;
            this.ctx.body = {
                code: 1,
                msg: '请求数据成功',
                result,
            };
        } else {
            this.ctx.status = 500;
            this.ctx.body = {
                code: 0,
                msg: '请求数据失败',
            };
        }
    }
    // 用户增加
    async addUser() {
        console.log(this.ctx.request.query,'quer');
        
        const result = await this.ctx.service.app.addUser(this.ctx.query);
        if (result.affectedRows && result.affectedRows > 0) {
            this.ctx.status = 200;
            this.ctx.body = {
                code: 1,
                msg: '添加成功',
            };
        } else {
            this.ctx.status = 500;
            this.ctx.body = {
                code: 0,
                msg: '添加失败',
            };
        }
    }
    //用户删除
    async deleteUser() {
        const result = await this.ctx.service.app.deleteUser(this.ctx.query);
        if (result.affectedRows && result.affectedRows > 0) {
            this.ctx.status = 200;
            this.ctx.body = {
                code: 1,
                msg: '删除成功',
            };
        } else {
            this.ctx.status = 500;
            this.ctx.body = {
                code: 0,
                msg: '删除失败',
            };
        }
    }
    //用户编辑
    async changeUser() {
        const result = await this.ctx.service.app.changeUser(this.ctx.query);
        if (result.affectedRows && result.affectedRows > 0) {
            this.ctx.status = 200;
            this.ctx.body = {
                code: 1,
                msg: '编辑成功',
            };
        } else {
            this.ctx.status = 500;
            this.ctx.body = {
                code: 0,
                msg: '编辑失败',
            };
        }
    }
}

module.exports = homeController;
