import React, { Component } from 'react';
import { connect } from 'dva';
import { Layout, Menu, Icon } from 'antd';
import Router from '../../router/map';
import './index.css';

const { Sider } = Layout;
const { SubMenu } = Menu;

@connect((state: any) => {
    return state;
})
class index extends Component<any> {
    state = {
        collapsed: false,
    };
    componentDidMount() {
        this.props.dispatch({type:"food/getzuo"})
        this.props.dispatch({
            type: "examination/getSjlist"
        })

    }
    render() {
        let { routes, history } = this.props;
        return (
            <div className="home">
                <div className="head">
                    <div className="heado">
                        <img src="/捕获.PNG" alt="图片加载失败" />
                    </div>
                    <div className="headt">
                        <li>
                            <b>北 京 八 维 研 修 学 院</b>
                        </li>
                        <p>BEI JING BA WEI YAN XIU XUEYUAN</p>
                    </div>
                </div>
                <div className="homePage">
                    <Layout style={{ minHeight: '100vh' }}>
                        <Sider
                            collapsible
                            collapsed={this.state.collapsed}
                            onCollapse={this.onCollapse}
                        >
                            <div className="logo" />
                            <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                                <SubMenu
                                    key="sub1"
                                    title={
                                        <Menu.Item key="11">
                                            <Icon type="pie-chart" />
                                            <span>试题管理</span>
                                        </Menu.Item>
                                    }
                                >
                                    <Menu.Item
                                        onClick={() => {
                                            this.props.history.push('/teach/AddStage');
                                        }}
                                        key="1"
                                    >
                                        <span>添加阶段</span>
                                    </Menu.Item>
                                    <Menu.Item
                                        onClick={() => {
                                            this.props.history.push('/teach/AddText');
                                        }}
                                        key="2"
                                    >
                                        <span>添加试题</span>
                                    </Menu.Item>
                                    <Menu.Item
                                        onClick={() => {
                                            this.props.history.push('/teach/CheckText');
                                        }}
                                        key="3"
                                    >
                                        <span>查看试题</span>
                                    </Menu.Item>
                                </SubMenu>

                                <SubMenu
                                    key="sub2"
                                    title={
                                        <span>
                                            <span>
                                                <Icon type="video-camera" />
                                                <span>考试管理</span>
                                            </span>
                                        </span>
                                    }
                                >
                                    <Menu.Item
                                        onClick={() => {
                                            this.props.history.push('/teach/classdraw');
                                        }}
                                        key="4"
                                    >
                                        <span>班级出题</span>
                                    </Menu.Item>
                                    <Menu.Item
                                        onClick={() => {
                                            this.props.history.push('/teach/beginexam');
                                        }}
                                        key="5"
                                    >
                                        <span>开始考试</span>
                                    </Menu.Item>
                                    <Menu.Item
                                        onClick={() => {
                                            this.props.history.push('/teach/checkgrade');
                                        }}
                                        key="6"
                                    >
                                        <span>查看成绩</span>
                                    </Menu.Item>
                                </SubMenu>
                                <Menu.Item
                                    onClick={() => {
                                        this.props.history.push('/teach/userque');
                                    }}
                                    key="7"
                                >
                                    <Icon type="user" />
                                    <span>用户管理</span>
                                </Menu.Item>
                                <Menu.Item
                                    onClick={() => {
                                        this.props.history.push('/teach/classque');
                                    }}
                                    key="8"
                                >
                                    <Icon type="desktop" />
                                    <span>班级管理</span>
                                </Menu.Item>
                                <Menu.Item
                                    onClick={() => {
                                        this.props.history.push('/teach/studentque');
                                    }}
                                    key="9"
                                >
                                    <Icon type="file" />
                                    <span>学生管理</span>
                                </Menu.Item>
                            </Menu>
                        </Sider>
                        <div className="kxd_right">
                            <Router routers={routes} history={history}></Router>
                        </div>
                    </Layout>
                </div>
            </div>
        );
    }
    onCollapse = (collapsed: any) => {
        this.setState({ collapsed });
    };
}

export default index;
