const Service = require('egg').Service;
class NewsService extends Service {
    //查
    async lookAllUser() {
        return await this.app.mysql.query('select * from ADTable');
    }
    //增
    async addUser({ ADname, type,email,ADpassword }) {
     
        
        const $sql = 'insert into ADTable (ADname,type,email,ADpassword) values (?,?,?,?)';
        const $params = [ADname, type,email,ADpassword];
        return await this.app.mysql.query($sql, $params);
    }
    
    //添加学生库
    async students({ user_class,user_name }) {
        const $sql = 'insert into student (user_class,user_name) values (?,?)';
        const $params = [user_class,user_name];
        return await this.app.mysql.query($sql, $params);
    }
    // 删
    async deleteUser({ uid }) {
        const $sql = 'delete from ADTable where uid=?';
        const $params = [uid];
        return await this.app.mysql.query($sql, $params);
    }
    // 改
    async changeUser({ ADname, uid, type, email }) {
        
        const $sql = `update ADTable set ADname=?,type=?,email=? where uid=?`;
        const $params = [ADname, type, email,uid ];
        return await this.app.mysql.query($sql, $params);
    }
    async lookAllUsers() {
        return await this.app.mysql.query('select * from user_AD');
    }
}
module.exports = NewsService;
