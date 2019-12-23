import Loading from '../utlis/loading';

const Login = Loading(() => import('../container/login'));
//忘记密码
const forgetPas = Loading(() => import('../container/login/forgectPas'));

//教师系统
const Teach = Loading(() => import('../container/Teach'));
//班级管理
const ClassQue = Loading(() => import('../container/Teach/ClassQue'));
//用户管理
const UserQue = Loading(() => import('../container/Teach/UserQue'));
//学生管理
const StudentQue = Loading(() => import('../container/Teach/StudentQue'));

//考试管理
//开始考试
const BeginExam = Loading(() => import('../container/Teach/ExamQue/BeginExam'));
//查看成绩
const CheckGrade = Loading(() => import('../container/Teach/ExamQue/CheckGrade'));
//班级出题
const ClassDraw = Loading(() => import('../container/Teach/ExamQue/ClassDraw'));
//班级已有题
const classTopic = Loading(() => import('../container/Teach/ExamQue/classTopic'));

//试题管理
//添加阶段
const AddStage = Loading(() => import('../container/Teach/TestQue/AddStage'));
//添加试题
const AddText = Loading(() => import('../container/Teach/TestQue/AddText'));
//查看试题
const CheckText = Loading(() => import('../container/Teach/TestQue/CheckText'));

export default [
    {
        //登录
        path: '/login',
        name: 'login',
        component: Login,
        children: [],
    },
    {
        path: '/teach',
        name: 'teach',
        component: Teach,
        children: [
            {
                //班级管理
                path: '/teach/classque',
                name: 'ClassQue',
                component: ClassQue,
                children: [],
            },
            {
                //用户管理
                path: '/teach/userque',
                name: 'UserQue',
                component: UserQue,
                children: [],
            },
            {
                //学生管理
                path: '/teach/studentque',
                name: 'StudentQue',
                component: StudentQue,
                children: [],
            },
            {
                //开始考试
                path: '/teach/beginexam',
                name: 'BeginExam',
                component: BeginExam,
                children: [],
            },
            {
                //查看成绩
                path: '/teach/checkgrade',
                name: 'CheckGrade',
                component: CheckGrade,
                children: [],
            },
            {
                //班级出题
                path: '/teach/classdraw',
                name: 'ClassDraw',
                component: ClassDraw,
                children: [],
            },
            {
                //添加阶段
                path: '/teach/AddStage',
                name: 'AddStage',
                component: AddStage,
                children: [],
            },
            {
                //添加试题
                path: '/teach/AddText',
                name: 'AddText',
                component: AddText,
                children: [],
            },
            {
                //查看试题
                path: '/teach/CheckText',
                name: 'CheckText',
                component: CheckText,
                children: [],
            },
        ],
    },
    {
        //班级已有题
        path: '/classtopic',
        name: 'classTopic',
        component: classTopic,
        children: [],
    },
    {
        //旺季密码
        path: '/forgetpas',
        name: 'forgetPas',
        component: forgetPas,
        children: [],
    },
];
