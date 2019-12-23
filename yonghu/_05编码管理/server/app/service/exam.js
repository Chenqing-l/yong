const Service = require('egg').Service;
class NewsService extends Service {
    //班级
    async class() {
        return await this.app.mysql.query(` SELECT * FROM class `);
    }
    async AddClassmate(class_name, classroom_name, teacher_name) {
        return await this.app.mysql.insert('class', { class_name, classroom_name, teacher_name });
    }
    async EditClass(class_name, classroom_name, teacher_name, id) {
        return await this.app.mysql.query(
            `UPDATE class SET class_name = '${class_name}',classroom_name='${classroom_name}',teacher_name='${teacher_name}' WHERE id = '${id}' `
        );
    }
    async DeletClass(id) {
        return await this.app.mysql.query(`DELETE FROM class WHERE id = '${id}'`);
    }
    async classLooks(id) {
        return await this.app.mysql.get('class', { id });
    }

    //查看班级已有题
    async classtopic({ className }) {
        const results = await this.app.mysql.select('classTopic', {
            where: { className: className }, // WHERE 条件
            columns: ['haveTopicId'], // 要查询的表字段
            orders: '', // 排序方式
            limit: 0, // 返回数据量
            offset: 0, // 数据偏移量
        });
        let topicList = [];
        for (let i = 0; i < results.length; i++) {
            let item = await this.app.mysql.get('examination', { id: results[i].haveTopicId });
            topicList.push(item);
        }
        if (topicList) {
            return {
                code: 1,
                data: topicList,
                msg: '请求成功',
            };
        } else {
            return {
                code: -1,
                msg: '查看失败',
            };
        }
    }
    //学生
    async student() {
        return await this.app.mysql.query(` SELECT * FROM student `);
    }
    async Addstudent(
        user_name,
        user_phone,
        user_class,
        user_age,
        user_address,
        user_gender,
        user_password
    ) {
        return await this.app.mysql.insert('student', {
            user_name,
            user_phone,
            user_class,
            user_age,
            user_address,
            user_gender,
            user_password,
            type: 2,
        });
    }
    async EditStudent(
        user_name,
        user_phone,
        user_class,
        user_age,
        user_address,
        user_gender,
        user_password,
        user_id
    ) {
        return await this.app.mysql.query(
            `UPDATE student SET user_name = '${user_name}',user_phone='${user_phone}',user_class='${user_class}',user_age='${user_age}',user_address='${user_address}',user_password ='${user_password}',user_gender='${user_gender}' WHERE user_id = ${user_id} `
        );
    }
    async DeletStudent(user_id) {
        return await this.app.mysql.query(`DELETE FROM student WHERE user_id = '${user_id}'`);
    }
    async classLook(user_id) {
        return await this.app.mysql.get('student', { user_id });
    }

    //试卷
    async getlist() {
        return await this.app.mysql.select('examination');
    }
    async add(title, A, B, C, D, type, real, id) {
        return await this.app.mysql.insert('examination', {
            title: title,
            A: A,
            B: B,
            C: C,
            D: D,
            real: real,
            type: type,
        });
    }
    async Lookcourse(course) {
        return await this.app.mysql.select('examination', {
            where: { type: course },
        });
    }
    //自动出题
    async elfMotion(topicNum, course, className) {
        const results = await this.app.mysql.select('examination', {
            where: { type: course }, // WHERE 条件
            columns: ['id', 'title'], // 要查询的表字段
            orders: '',
            limit: topicNum, // 返回数据量
            offset: 0, // 数据偏移量
        });

        return this.GotoClassTopic(results, className);
    }
    //保存班级已有试题
    async GotoClassTopic(results, className) {
        let isHave = [];
        for (let i = 0; i < results.length; i++) {
            let isOk = await this.app.mysql.insert('classTopic', {
                haveTopicId: results[i].id,
                className: className,
            });
            if (isOk) {
                isHave.push(isOk.affectedRows);
            } else {
                isHave.push(2);
            }
        }
        let isSuccess = isHave.every(item => item == 1);
        if (isSuccess) {
            return {
                code: 1,
                msg: '出题成功',
            };
        } else {
            return {
                code: -1,
                msg: '出题失败',
            };
        }
    }
    async delelfMotion(id) {
        return await this.app.mysql.delete('examination', { id: id });
    }
    async getphaseslist() {
        return await this.app.mysql.select('phases');
    }
    async Modifythetest(title, A, B, C, D, type, real, id) {
        let obj = {
            where: {
                id: id,
            },
        };
        return await this.app.mysql.update(
            'examination',
            {
                title: title,
                A: A,
                B: B,
                C: C,
                D: D,
                real: real,
                type: type,
            },
            obj
        );
    }
}
module.exports = NewsService;
