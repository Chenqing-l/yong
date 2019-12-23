import React, { Component } from 'react';
import './index.css';
import { findPassword, setNewPassword } from '../../../api';
import { Modal, message, Input } from 'antd';
const { confirm } = Modal;

export class index extends Component<any> {
    state = {
        zhanghu: '',
        email: '',
        newpassword1: '',
        newpassword2: '',
        flag: false,
        id: '',
    };
    render() {
        return (
            <div className="forget_password">
                {this.state.flag ? (
                    <div className="forget_password_renzheng">
                        <h2>设&nbsp;&nbsp;置&nbsp;&nbsp;新&nbsp;&nbsp;密&nbsp;&nbsp;码</h2>
                        <p>
                            <Input.Password
                                className="zhagnhao"
                                onChange={e => {
                                    this.setState({ newpassword1: e.target.value });
                                }}
                                placeholder="输入新密码"
                            />
                        </p>
                        <p>
                            <Input.Password
                                className="zhagnhao"
                                onChange={e => {
                                    this.setState({ newpassword2: e.target.value });
                                }}
                                placeholder="确认新密码"
                            />
                        </p>
                        <button onClick={() => this.setPassword()}>
                            确&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;认
                        </button>
                    </div>
                ) : (
                    <div className="forget_password_renzheng">
                        <h2>找&nbsp;&nbsp;回&nbsp;&nbsp;密&nbsp;&nbsp;码</h2>
                        <p>
                            <Input
                                className="zhagnhao"
                                onChange={e => {
                                    this.setState({ zhanghu: e.target.value });
                                }}
                                placeholder=" 输入要找回的账户"
                            />
                        </p>
                        <p>
                            <Input
                                className="zhagnhao"
                                onChange={e => {
                                    this.setState({ email: e.target.value });
                                }}
                                placeholder=" 输入绑定的邮箱"
                            />
                        </p>
                        <button onClick={() => this.nowFind()}>
                            立&nbsp;&nbsp;即&nbsp;&nbsp;找&nbsp;&nbsp;回
                        </button>
                    </div>
                )}
            </div>
        );
    }
    async nowFind() {
        let { zhanghu, email } = this.state;
        let testZhang = /^[a-zA-Z\d\u4e00-\u9fa5]{5,9}/;
        let testemail = /^\w+@[a-zA-Z\d]+\.[a-zA-Z]{2,4}/;
        let whetherZhang = testZhang.test(zhanghu);
        let whetherEmail = testemail.test(email);
        if (whetherZhang && whetherEmail) {
            let userdata = {
                zhanghu,
                email,
            };
            let whereTrue = await findPassword(userdata);
            if (whereTrue.code == 1) {
                this.showConfirm(whereTrue.password, whereTrue.id);
                // jasen222@163.com
            } else {
                message.error(whereTrue.msg);
            }
        } else {
            message.error('账户或邮箱输入错误,请重新输入！！！');
        }
    }
    showConfirm(youpassword: any, id: any) {
        let This = this;
        confirm({
            cancelText: '取消',
            okText: '确定',
            title: `您的密码为：${youpassword},是否设置新密码？`,
            content: '点击取消跳转登录页面，点击确定即可设置新密码',
            onOk() {
                This.setState({ id, flag: true });
            },
            onCancel() {
                This.props.history.push('/login');
            },
        });
    }

    async setPassword() {
        let { newpassword1, newpassword2, id } = this.state;
        let pass: any = /^[a-zA-Z0-9]{6,10}$/;
        let wherepass = pass.test(newpassword1);
        let wherepass2 = pass.test(newpassword2);
        if (wherepass && wherepass2) {
            if (newpassword1 == newpassword2) {
                message.loading({ content: '正在设置新密码....' });
                let newdata = {
                    id: Number(id) * 1,
                    newpassword: newpassword1,
                };
                let whereSet = await setNewPassword(newdata);
                if (whereSet.code == 1) {
                    setTimeout(() => {
                        message.success({ content: '设置成功，3秒后跳转登录页面!', duration: 2 });
                    }, 3000);
                    setTimeout(() => {
                        this.props.history.push('/login');
                    }, 6000);
                } else {
                    message.error('设置失败，请检查网络！！！');
                }
            } else {
                message.error('两次密码输入不正确');
            }
        } else {
            message.error('输入格式不正确');
        }
    }
}

export default index;
