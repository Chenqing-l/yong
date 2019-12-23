import React, { Component } from 'react';
import axios from 'axios';
import { Layout, Menu, Breadcrumb, Divider, Button, Table, Modal, Input, Pagination } from 'antd';
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

export class index extends Component<any> {
    state = {
        addba: {
            class_name: '',
            classroom_name: '',
            teacher_name: '',
            id: '',
        },
        collapsed: false,
        list: [],
        visible: false,
        visibles: false,
    };
    render() {
        const columns = [
            {
                title: '班级名称',
                dataIndex: 'name',
            },
            {
                title: '班级名称',
                dataIndex: 'age',
            },
            {
                title: '负责教师',
                dataIndex: 'address',
            },
            {
                title: '操作',
                key: 'action',
                render: (text: any, record: any) => (
                    <span>
                        <span onClick={this.xgok.bind(this, text.id)}>修改</span>
                        <Divider type="vertical" />
                        <span>查看</span>
                        <Divider type="vertical" />
                        <span onClick={this.delok.bind(this, text.id)}>删除</span>
                    </span>
                ),
            },
        ];
        let { list, visible, visibles, addba } = this.state;

        const rowSelection = {
            getCheckboxProps: (record: any) => ({
                disabled: record.name === 'Disabled User', // Column configuration not to be checked
                name: record.name,
            }),
        };
        return (
            <div>
                <Layout>
                    <Content style={{ margin: '0 16px' }}>
                        <Breadcrumb style={{ margin: '16px 0' }}>
                            <Breadcrumb.Item>用户</Breadcrumb.Item>
                            <Breadcrumb.Item>及其管理</Breadcrumb.Item>
                        </Breadcrumb>
                        <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
                            <Button type="primary" onClick={this.showadd} className="ok">
                                添加用户
                            </Button>
                            <Layout>
                                <Modal
                                    title="新增"
                                    onCancel={this.handleCancel}
                                    visible={visible}
                                    onOk={this.addok}
                                >
                                    班级名称
                                    <Input
                                        type="text"
                                        value={addba.class_name}
                                        onChange={e => {
                                            addba.class_name = e.target.value;
                                            this.setState({ addba });
                                        }}
                                        placeholder="请输入班级名称"
                                    />
                                    班级人数
                                    <Input
                                        type="text"
                                        value={addba.classroom_name}
                                        onChange={e => {
                                            addba.classroom_name = e.target.value;
                                            this.setState({ addba });
                                        }}
                                        placeholder="请输入班级人数"
                                    />
                                    负责人
                                    <Input
                                        type="text"
                                        value={addba.teacher_name}
                                        onChange={e => {
                                            addba.teacher_name = e.target.value;
                                            this.setState({ addba });
                                        }}
                                        placeholder="请输入负责人"
                                    />
                                </Modal>
                            </Layout>
                            <Layout>
                                <Modal
                                    title="修改"
                                    onCancel={this.handleCancel}
                                    visible={visibles}
                                    onOk={this.xgok}
                                >
                                    班级名称
                                    <Input
                                        type="text"
                                        value={addba.class_name}
                                        onChange={e => {
                                            addba.class_name = e.target.value;
                                            this.setState({ addba });
                                        }}
                                        placeholder="请输入班级名称"
                                    />
                                    班级人数
                                    <Input
                                        type="text"
                                        value={addba.classroom_name}
                                        onChange={e => {
                                            addba.classroom_name = e.target.value;
                                            this.setState({ addba });
                                        }}
                                        placeholder="请输入班级人数"
                                    />
                                    负责人
                                    <Input
                                        type="text"
                                        value={addba.teacher_name}
                                        onChange={e => {
                                            addba.teacher_name = e.target.value;
                                            this.setState({ addba });
                                        }}
                                        placeholder="请输入负责人"
                                    />
                                </Modal>
                            </Layout>
                            <Table
                                rowSelection={rowSelection}
                                columns={columns}
                                pagination={{ pageSize: 5 }}
                                dataSource={list}
                            />
                        </div>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>
                        网站考试系统--------班级管理页面
                    </Footer>
                </Layout>
            </div>
        );
    }
    handleCancel = (e: any) => {
        this.setState({
            visible: false,
        });
    };
    onCollapse = (collapsed: any) => {
        this.setState({ collapsed });
    };
    componentDidMount() {
        this.getNewdata();
    }
    addok = () => {
        axios.post('http://localhost:7001/class/AddClassmate', this.state.addba).then(res => {
            this.getNewdata();
        });
        this.setState({
            visible: false,
        });
    };
    xgok = () => {
        axios.post('http://localhost:7001/class/EditClass', this.state.addba).then(res => {
            this.getNewdata();
        });
        this.setState({
            visibles: false,
        });
    };
    detail = (id: any) => {
        let obj = {
            class_name: '',
            classroom_name: '',
            teacher_name: '',
            id,
        };
        this.setState({
            visibles: true,
            addba: obj,
        });
    };
    delok(id: any) {
        axios.get('http://localhost:7001/class/DeletClass', { params: { id: id } }).then(res => {
            this.setState({
                id: id,
            });
            this.getNewdata();
        });
    }
    //获取数据
    getNewdata() {
        axios.get('http://localhost:7001/class').then(res => {
            let newArr: Array<any> = [];
            res.data.result.forEach((item: any, index: number) => {
                newArr.push({
                    id: item.id,
                    key: index,
                    name: item.class_name,
                    age: item.classroom_name,
                    address: item.teacher_name,
                });
            });
            this.setState({
                list: newArr,
            });
        });
    }
    showadd = () => {
        this.setState({
            visible: true,
        });
    };
}

export default index;
