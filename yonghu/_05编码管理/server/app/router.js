'use strict';
/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
    const { router, controller } = app;
    //登录
    router.post('/login', controller.login.login);
    //找回密码
    router.post('/login/findpassowrd', controller.login.findpassword);
    //设置新密码
    router.post('/login/newPassword', controller.login.newPassword);
    //试题
    router.get('/paper/lookAllstage', controller.exam.getExaminationlist);
    router.post('/paper/addTestQuestions', controller.exam.addTestPaper);
    router.post('/paper/lookOneCourse', controller.exam.lookOneCourse);
    router.get('/paper/come/elfMotion', controller.exam.elfMotion);
    router.post('/paper/come/EditelfMotion', controller.exam.EditelfMotion);
    router.get('/paper/come/delelfMotion', controller.exam.delelfMotion);
    router.get('/paper/come/getphaseslist', controller.exam.getphaseslist);
    // router.post('/paper/come/sureClassTopic', controller.exam.handelfMotion);手动
    //班级管理
    router.get('/class', controller.exam.class);
    router.post('/class/AddClassmate', controller.exam.AddClassmate);
    router.post('/class/EditClass', controller.exam.EditClass);
    router.get('/class/DeletClass', controller.exam.DeletClass);
    router.get('/classLook', controller.exam.classLook);

    //查看班级已有题
    router.post('/class/classtopic', controller.exam.classtopic);

    //学生管理
    router.get('/student', controller.exam.student);
    router.post('/student/Addstudent', controller.exam.Addstudent);
    router.post('/student/EditStudent', controller.exam.EditStudent);
    router.get('/student/DeletStudent', controller.exam.DeletStudent);
    router.post('/student/searchstudent', controller.exam.searchstudent);
    //用户管理
    router.get('/User/lookAllUser',controller.app.lookAllUser);//查找
    router.get('/User/addUser', controller.app.addUser)//增加
    router.get('/User/deleteUser', controller.app.deleteUser)//删除
    router.get('/User/changeUser', controller.app.changeUser)//编辑
    //查找用户身份
    router.get('/User/lookAllUsers',controller.app.lookAllUsers);//查找
    //添加学生库
    // router.get('/User/students',controller.app.students);//查找
};
