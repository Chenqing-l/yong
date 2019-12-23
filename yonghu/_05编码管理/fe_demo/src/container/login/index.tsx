import React, { Component } from 'react';
import { connect } from 'dva';
import './index.css';
import { Menu, message, Input } from 'antd';

const menu = (
    <Menu>
        <Menu.Item>学生</Menu.Item>
        <Menu.Item>辅导员</Menu.Item>
        <Menu.Item>老师</Menu.Item>
    </Menu>
);

@connect((store: any) => {
    return store;
})
class index extends Component<any> {
    state = { userName: '', password: '' };
    render() {
        return (
            <div className="home">
                <img src="/1.jpg" alt="图片加载失败" />
                <div className="homeOld">
                    <div className="homeLeft">
                        <h1>考试管理平台——04</h1>
                        <p>考试与班级一站式服务管理平台欢迎您</p>
                    </div>
                    <div className="homeRight">
                        <div className="login">
                            <p>登录</p>
                            <Input
                                className="zhagnhao"
                                onChange={e => {
                                    this.setState({ userName: e.target.value });
                                }}
                                placeholder="请输入用户名"
                            />
                            <br />
                            <Input.Password
                                className="Password"
                                onChange={e => {
                                    this.setState({ password: e.target.value });
                                }}
                                placeholder="请输入密码"
                            />
                            <br />
                            <br />
                            <button onClick={() => this.Login()}>登录</button>

                            <li onClick={() => this.forget()}>
                                <a href="">忘&nbsp;记&nbsp;密&nbsp;码&nbsp;?</a>
                            </li>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    showhomePage = () => {
        this.props.history.push('/teach');
    };
    forget() {
        this.props.history.push('/forgetpas');
    }
    async Login() {
        let { userName, password } = this.state;
        let user: any = /^[a-zA-Z\u4e00-\u9fa5]{5,10}$/;
        let pass: any = /^[a-zA-Z0-9]{6,10}$/;
        let userTest = user.test(userName);
        let passTest = pass.test(password);

        if (userTest && passTest) {
            let userData = { userName, password };
            await this.props.dispatch({
                type: 'login/LoginUser',
                userData,
            });
            let {
                login: { isLogin },
            } = this.props;
            if (isLogin == 0) {
                this.props.history.push('/teach');
            } else {
                message.error(isLogin);
            }
        } else {
            message.error('账户或密码输入错误,请重新输入！！！');
        }
    }
}

export default index;
