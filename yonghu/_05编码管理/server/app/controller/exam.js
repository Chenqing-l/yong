'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
    //试题
    async getExaminationlist() {
        const result = await this.ctx.service.exam.getlist();
        this.ctx.body = {
            code: 1,
            msg: 'success',
            result,
        };
    }
    async addTestPaper() {
        let { title, A, B, C, D, type, real, id } = this.ctx.request.body;
        const result = await this.ctx.service.exam.add(title, A, B, C, D, type, real, id);
        this.ctx.body = {
            code: 1,
            msg: 'Add success',
        };
    }
    async lookOneCourse() {
        let { course } = this.ctx.request.body;
        const result = await this.ctx.service.exam.Lookcourse(course);
        this.ctx.body = {
            code: 1,
            msg: 'Look success',
            result,
        };
    }
    async elfMotion() {
        let { topicNum, course, className } = this.ctx.query;
        this.ctx.body = await this.ctx.service.exam.elfMotion(topicNum, course, className);
    }
    async getphaseslist() {
        const result = await this.ctx.service.exam.getphaseslist();
        this.ctx.body = {
            code: 1,
            msg: 'success',
            result,
        };
    }
    async delelfMotion() {
        let { id } = this.ctx.query;
        let result = await this.ctx.service.exam.delelfMotion(id);
        this.ctx.body = {
            code: 1,
            msg: 'Del success',
        };
    }
    async EditelfMotion() {
        let { title, A, B, C, D, type, real, id } = this.ctx.request.body.params;
        const result = await this.ctx.service.exam.Modifythetest(title, A, B, C, D, type, real, id);
        this.ctx.body = {
            code: 1,
            msg: 'Edit success',
        };
    }
    // async handelfMotion() {
    //     // let { topicNum, course } = this.ctx.query
    //     // let newarr = [];
    //     // for (var i = newarr.length; i < topicNum; i++) {
    //     //     let result = await this.ctx.service.exam.handelfMotion(topicNum, course)
    //     //     newarr.push(result)
    //     // }
    //     // }
    // }
    //查看班级已有提
    async classtopic() {
        this.ctx.body = await this.ctx.service.exam.classtopic(this.ctx.request.body);
    }
    //班级管理
    async class() {
        const { ctx, service } = this;
        const result = await service.exam.class();
        console.log(result);
        ctx.body = {
            code: 1,
            result,
        };
    }
    async AddClassmate() {
        const { ctx, service } = this;
        const { class_name, classroom_name, teacher_name } = ctx.request.body;
        const result = await service.exam.AddClassmate(class_name, classroom_name, teacher_name);
        ctx.body = {
            code: 1,
            result,
        };
    }
    async EditClass() {
        const { ctx, service } = this;
        const { class_name, classroom_name, teacher_name, id } = ctx.request.body;
        const result = await service.exam.EditClass(class_name, classroom_name, teacher_name, id);
        ctx.body = {
            code: 1,
            result,
        };
    }
    async DeletClass() {
        const { ctx, service } = this;
        const { id } = ctx.query;
        const result = await service.exam.DeletClass(id);
        ctx.body = {
            code: 1,
            result,
        };
    }
    async classLook() {
        const { ctx, service } = this;
        const { id } = ctx.query;
        // console.log(id)
        const result = await service.exam.classLooks(id);
        ctx.body = {
            code: 1,
            result,
        };
    }

    async student() {
        const { ctx, service } = this;
        const result = await service.exam.student();
        ctx.body = {
            code: 1,
            result,
        };
    }
    async Addstudent() {
        const { ctx, service } = this;
        const {
            user_name,
            user_phone,
            user_class,
            user_age,
            user_address,
            user_gender,
            user_password,
        } = ctx.request.body;
        const result = await service.exam.Addstudent(
            user_name,
            user_phone,
            user_class,
            user_age,
            user_address,
            user_gender,
            user_password
        );

        ctx.body = {
            code: 1,
            result,
        };
    }
    async EditStudent() {
        const { ctx, service } = this;
        const {
            user_name,
            user_phone,
            user_class,
            user_age,
            user_address,
            user_gender,
            user_password,
            user_id,
        } = ctx.request.body;
        const result = await service.exam.EditStudent(
            user_name,
            user_phone,
            user_class,
            user_age,
            user_address,
            user_gender,
            user_password,
            user_id
        );
        ctx.body = {
            code: 1,
            result,
        };
    }
    async DeletStudent() {
        const { ctx, service } = this;
        const { user_id } = ctx.query;
        const result = await service.exam.DeletStudent(user_id);
        ctx.body = {
            code: 1,
            result,
        };
    }
    async searchstudent() {
        const { ctx, service } = this;
        const { user_id } = ctx.body;
        console.log(user_id, 'user_id');

        const result = await service.exam.searchstudent(user_id);
        ctx.body = {
            code: 1,
            result,
        };
    }
}

module.exports = HomeController;
