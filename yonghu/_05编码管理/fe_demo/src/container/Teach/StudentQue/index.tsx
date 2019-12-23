import React, { Component } from 'react';
import { connect } from 'dva';
import axios from 'axios';
import { Layout, Menu, Breadcrumb, Icon, Input, Modal, Button, Table, Divider, Tag } from 'antd';
import './index.css';
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

@connect((state: any) => {
    return state;
})
class index extends Component<any> {
    state = {
        collapsed: false,
        studentlist: [],
        columns: [
            {
                title: '姓名',
                dataIndex: 'user_name',
                key: 'user_name',
                render: (text: any) => <a>{text}</a>,
            },
            {
                title: '年龄',
                dataIndex: 'user_age',
                key: 'user_age',
            },
            {
                title: '性别',
                dataIndex: 'user_gender',
                key: 'user_gender',
            },
            {
                title: '电话',
                dataIndex: 'user_phone',
                key: 'user_phone',
            },
            {
                title: '地址',
                dataIndex: 'user_address',
                key: 'user_address',
            },
            {
                title: '班级',
                dataIndex: 'user_class',
                key: 'user_class',
            },
            {
                title: '操作',
                key: 'action',
                render: (text: any, record: any) => (
                    <span>
                        <span onClick={() => this.Changedata(text)}>
                            <a>修改</a>
                        </span>
                        <Divider type="vertical" />
                        <span>
                            <a>查看</a>
                        </span>{' '}
                        <Divider type="vertical" />
                        <span
                            onClick={() => {
                                this.handTag(record);
                            }}
                        >
                            <a> 删除</a>
                        </span>
                    </span>
                ),
            },
        ],
        addba: {
            user_name: '',
            user_phone: '',
            user_class: '',
            user_age: '',
            user_address: '',
            user_gender: '',
            user_password: '',
            user_id: '',
        },
        list: [],
        visible: false,
        visibles: false,
    };
    handTag(el: any) {
        axios
            .get('http://localhost:7001/student/DeletStudent', { params: { user_id: el.user_id } })
            .then(res => {
                this.getNewdata();
            });
    }
    componentDidMount() {
        this.getNewdata();
    }

    getNewdata() {
        axios.get('http://localhost:7001/student').then(res => {
            this.setState({
                studentlist: res.data.result,
            });
        });
    }
    render() {
        let { studentlist, columns }: any = this.state;
        let { list, visible, visibles, addba } = this.state;
        return (
            <div className="sutdent_home">
                <div className="sutdent_homePage">
                    <Layout style={{ minHeight: '100vh' }}>
                        <Layout>
                            <Content style={{ margin: '0 16px' }}>
                                <Breadcrumb style={{ margin: '16px 0' }}>
                                    <Breadcrumb.Item>学生管理</Breadcrumb.Item>

                                    <Button onClick={this.showadd} className="sutend_btn">
                                        增加学生
                                    </Button>

                                    <input
                                        className="inp"
                                        type="text"
                                        placeholder="请输入学生姓名"
                                        value={addba.user_name}
                                        onChange={e => {
                                            addba.user_name = e.target.value;
                                            this.setState({ addba });
                                        }}
                                    />
                                    <button className="okk" onClick={this.showYh}>
                                        查询用户
                                    </button>
                                </Breadcrumb>
                                <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
                                    <Layout>
                                        <Modal
                                            onCancel={this.handleCancel}
                                            title="新增"
                                            visible={visible}
                                            onOk={this.addok}
                                        >
                                            学生姓名
                                            <Input
                                                type="text"
                                                value={addba.user_name}
                                                onChange={e => {
                                                    addba.user_name = e.target.value;
                                                    this.setState({ addba });
                                                }}
                                                placeholder="请输入学生姓名"
                                            />
                                            学生电话
                                            <Input
                                                type="text"
                                                value={addba.user_phone}
                                                onChange={e => {
                                                    addba.user_phone = e.target.value;
                                                    this.setState({ addba });
                                                }}
                                                placeholder="请输入学生电话"
                                            />
                                            学生班级
                                            <Input
                                                type="text"
                                                value={addba.user_class}
                                                onChange={e => {
                                                    addba.user_class = e.target.value;
                                                    this.setState({ addba });
                                                }}
                                                placeholder="请输入学生班级"
                                            />
                                            学生年龄
                                            <Input
                                                type="text"
                                                value={addba.user_age}
                                                onChange={e => {
                                                    addba.user_age = e.target.value;
                                                    this.setState({ addba });
                                                }}
                                                placeholder="请输入学生年龄"
                                            />
                                            学生地址
                                            <Input
                                                type="text"
                                                value={addba.user_address}
                                                onChange={e => {
                                                    addba.user_address = e.target.value;
                                                    this.setState({ addba });
                                                }}
                                                placeholder="请输入学生地址"
                                            />
                                            学生性别
                                            <Input
                                                type="text"
                                                value={addba.user_gender}
                                                onChange={e => {
                                                    addba.user_gender = e.target.value;
                                                    this.setState({ addba });
                                                }}
                                                placeholder="请输入学生性别"
                                            />
                                            学生密码
                                            <Input
                                                type="password"
                                                value={addba.user_password}
                                                onChange={e => {
                                                    addba.user_password = e.target.value;
                                                    this.setState({ addba });
                                                }}
                                                placeholder="请输入学生密码"
                                            />
                                        </Modal>
                                    </Layout>

                                    <Layout>
                                        <Modal
                                            onCancel={this.handleCancel2}
                                            title="修改"
                                            visible={visibles}
                                            onOk={this.xgok}
                                        >
                                            学生姓名
                                            <Input
                                                type="text"
                                                value={addba.user_name}
                                                onChange={e => {
                                                    addba.user_name = e.target.value;
                                                    this.setState({ addba });
                                                }}
                                                placeholder="请输入学生姓名"
                                            />
                                            学生电话
                                            <Input
                                                type="text"
                                                value={addba.user_phone}
                                                onChange={e => {
                                                    addba.user_phone = e.target.value;
                                                    this.setState({ addba });
                                                }}
                                                placeholder="请输入学生电话"
                                            />
                                            学生班级
                                            <Input
                                                type="text"
                                                value={addba.user_class}
                                                onChange={e => {
                                                    addba.user_class = e.target.value;
                                                    this.setState({ addba });
                                                }}
                                                placeholder="请输入学生班级"
                                            />
                                            学生年龄
                                            <Input
                                                type="text"
                                                value={addba.user_age}
                                                onChange={e => {
                                                    addba.user_age = e.target.value;
                                                    this.setState({ addba });
                                                }}
                                                placeholder="请输入学生年龄"
                                            />
                                            学生地址
                                            <Input
                                                type="text"
                                                value={addba.user_address}
                                                onChange={e => {
                                                    addba.user_address = e.target.value;
                                                    this.setState({ addba });
                                                }}
                                                placeholder="请输入学生地址"
                                            />
                                            学生性别
                                            <Input
                                                type="text"
                                                value={addba.user_gender}
                                                onChange={e => {
                                                    addba.user_gender = e.target.value;
                                                    this.setState({ addba });
                                                }}
                                                placeholder="请输入学生性别"
                                            />
                                            学生密码
                                            <Input
                                                type="password"
                                                value={addba.user_password}
                                                onChange={e => {
                                                    addba.user_password = e.target.value;
                                                    this.setState({ addba });
                                                }}
                                                placeholder="请输入学生密码"
                                            />
                                        </Modal>
                                    </Layout>
                                    <Table
                                        columns={columns}
                                        pagination={{ pageSize: 5 }}
                                        dataSource={studentlist}
                                    />
                                </div>

                                <Footer style={{ textAlign: 'center' }}>
                                    1704C-考试管理系统04 Design ©2018 Created by 1704C{' '}
                                </Footer>
                            </Content>
                        </Layout>
                    </Layout>
                </div>
            </div>
        );
    }
    //修改
    showadd = () => {
        this.setState({
            visible: true,
        });
    };
    onCollapse = (collapsed: any) => {
        this.setState({ collapsed });
    };
    addok = () => {
        axios.post('http://localhost:7001/student/Addstudent', this.state.addba).then(res => {
            this.getNewdata();
        });

        this.setState({
            visible: false,
        });
    };
    handleCancel = () => {
        this.setState({
            visible: false,
        });
    };
    handleCancel2 = () => {
        this.setState({
            visibles: false,
        });
    };
    //修改
    Changedata(studentData: any) {
        console.log(studentData, 'studentData');
        this.setState({ visibles: true, addba: studentData });
    }
    //查询某个学生
    showYh = () => {
        console.log(this.state.addba, 'id---a');

        axios.post('http://localhost:7001/student/searchstudent', this.state.addba).then(res => {
            console.log(res);
            let newarr = [];
            newarr.push(res.data.result);
            this.setState({
                studentlist: newarr,
            });
        });
    };
    xgok = () => {
        axios.post('http://localhost:7001/student/EditStudent', this.state.addba).then(res => {
            this.getNewdata();
        });
        this.setState({
            visibles: false,
        });
    };
}

export default index;
