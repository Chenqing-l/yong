import axios from 'axios';

export async function getSj() {
    let sjList = await axios.get('http://localhost:7001/getshop');
    return sjList.data.data;
}
export async function Login(userdata) {
    let loginBack = await axios.post('http://localhost:7001/login', {
        userName: userdata.userName,
        password: userdata.password,
    });
    return loginBack.data;
}
//找回密码
export async function findPassword(findPassword) {
    let WhereTrue = await axios.post('http://localhost:7001/login/findpassowrd', findPassword);
    return WhereTrue.data;
}
//设置新密码
export async function setNewPassword(newdata) {
    let WhereTrue = await axios.post('http://localhost:7001/login/newPassword', newdata);
    return WhereTrue.data;
}
export async function getexamitation() {
    let stList = await axios.get('http://localhost:7001/paper/lookAllstage');
    return stList;
}
export async function delexamitation(id) {
    let stList = await axios.get(`http://localhost:7001/paper/come/delelfMotion?id=${id}`);
    return stList;
}

export async function getphaseslist() {
    let getlist = await axios.get(`http://localhost:7001/paper/come/getphaseslist`);
    return getlist;
}
export async function EditelfMotion(params) {
    let getlist = await axios.post(`http://localhost:7001/paper/come/EditelfMotion`, { params });
    return getlist;
}
export async function addTestQuestions(params1) {
    let getlist = await axios.post(`http://localhost:7001/paper/addTestQuestions`, params1);
    return getlist;
}

export async function getzuoa() {
    let getzuos = await axios.get('http://localhost:7001/User/lookAllUser');
    return getzuos;
}
//增加
export async function getyou(ADname, type,email,ADpassword) {
type=Number(type)
    let getyous = await axios.get(
        `http://localhost:7001/User/addUser?ADname=${ADname}&type=${type}&email=${email}&ADpassword=${ADpassword}`
    );

    return getyous;
}
//删除
export async function shanchua(uid) {
    console.log(uid);
    let shanchu = await axios.get(`http://localhost:7001/User/deleteUser?uid=${uid}`);
    return shanchu;
}
//修改
export async function xiugaia(ADname, type, uid,email) {
    type=Number(type)
    let xiugai = await axios.get(
        `http://localhost:7001/User/changeUser?&ADname=${ADname}&type=${type}&uid=${uid}&email=${email}`
    );
    return xiugai;
}
//查找用户身份
export async function getzuoaqwe() {
    let getzuosqwe = await axios.get('http://localhost:7001/User/lookAllUsers');
    return getzuosqwe;
}
//用户管理视图
export async function getzuoaqweqwe(user_class,user_name) {
    let getzuosqweqwe = await axios.get(`http://localhost:7001/User/students?&user_class=${user_class}}&user_name=${user_name}`);
    return getzuosqweqwe;
}