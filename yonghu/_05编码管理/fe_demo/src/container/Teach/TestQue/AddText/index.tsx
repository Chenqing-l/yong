import React, { Component } from 'react';
import { connect } from 'dva';
import './index.css';
import { delexamitation, EditelfMotion, addTestQuestions, getexamitation } from '../../../../api/index'
import { Layout, Menu, Breadcrumb, Icon, Table, Divider, Tag, Modal, Button, Input, Select } from 'antd';
import axios from 'axios'
import { log } from 'util';
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;
const style = {
    width: 500,
};
const { Option }: any = Select;
@connect((state: any) => {
    return state;
})

export class index extends Component<any> {
    state = {
        loading: false,
        visible: false,
        name: "",
        visible1: false,
        visible2: false,
        collapsed: false,
        typelist: [],
        type: "",
        phourse: [],
        editcurrentlist: [],
        editcurrentlist1: {},
        id: "",
        examlist: [],
        list: [],
        columns: [
            {
                title: '题目要求',
                dataIndex: 'title',
                key: 'title',
                render: (text: any) => <a>{text}</a>,
            },
            {
                title: 'A',
                dataIndex: 'A',
                key: 'A',
            },
            {
                title: 'B',
                dataIndex: 'B',
                key: 'B',
            },
            {
                title: 'C',
                dataIndex: 'C',
                key: 'C',
            },
            {
                title: 'D',
                dataIndex: 'D',
                key: 'D',
            },
            {
                title: '正确答案',
                dataIndex: 'real',
                key: 'real',
            },
            {
                title: '所属阶段',
                dataIndex: 'type',
                key: 'type',
            },
            {
                title: '操作',
                key: 'action',
                render: (text: any, record: any) => (
                    <span>
                        <a onClick={() => {
                            this.editModal(text);
                        }}>修改</a>
                        <Divider type="vertical" />
                        <a
                            onClick={() => {
                                this.showModal(text);
                            }}
                        >
                            删除
                        </a>
                    </span>
                ),
            },
        ],
    };
    componentDidMount() {
        getexamitation().then(res => {
            this.setState({
                examlist: res.data.result
            })
        })
    }
    showModal = (text: any) => {
        this.setState({
            id: text.id,
            visible: true,
        });
    };
    editModal(el: any) {
        let { jdList } = this.props.examination
        let newname = jdList[el.type].name
        this.setState({
            name: newname,
            type: el.type,
            editcurrentlist: el,
            visible1: true,
        })
    }
    openadd() {
        this.setState({
            visible2: true
        })
    }
    handleOk = () => {
        this.setState({ loading: true });
        delexamitation(this.state.id)
        setTimeout(() => {
            getexamitation().then(res => {
                this.setState({
                    examlist: res.data.result, loading: false, visible: false
                })
            })
        }, 100);
    };
    handleOk1 = () => {
        let currentlist: any = this.state.editcurrentlist
        currentlist.type = this.state.type
        EditelfMotion(currentlist)
        setTimeout(() => {
            getexamitation().then(res => {
                this.setState({
                    examlist: res.data.result, loading: false, visible1: false
                })
            })
        }, 100);
    };
    handleOk2 = () => {

        let currentlist: any = this.state.editcurrentlist1
        currentlist.type = this.state.type
        addTestQuestions(currentlist)
        setTimeout(() => {
            getexamitation().then(res => {
                this.setState({
                    examlist: res.data.result, loading: false, visible2: false
                })
            })
        }, 100);

    };
    handleCancel = () => {
        this.setState({ visible: false });
    };
    handleCance1 = () => {
        this.setState({ visible1: false });
        getexamitation().then(res => {
            this.setState({
                examlist: res.data.result
            })
        })
    };
    onCollapse = (collapsed: any) => {
        this.setState({ collapsed });
    };
    handleCance2 = () => {
        this.setState({ visible2: false });
    };
    handIndex(index: any) {
        this.setState({
            type: index
        })
    }
    render() {
        let { list, columns, phourse, editcurrentlist, editcurrentlist1, visible2, name }: any = this.state;
        const { visible, loading, visible1, type, examlist } = this.state;
        let { jdList } = this.props.examination
        return (
            <>
                <Layout>
                    <Content style={{ margin: '0 16px' }}>
                        <Breadcrumb style={{ margin: '16px 0' }}>
                            <Breadcrumb.Item>试题管理</Breadcrumb.Item>
                        </Breadcrumb>
                        <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
                            <Table dataSource={examlist && examlist} columns={columns} />
                        </div>
                        <Button onClick={() => { this.openadd() }} className="addtext_btn">增加试题</Button>
                        <Footer style={{ textAlign: 'center' }}>
                            1704C-考试管理系统04 Design ©2018 Created by 1704C{' '}
                        </Footer>
                    </Content>
                </Layout>

                <div className="delet">
                    <Modal
                        visible={visible}
                        title="删除"
                        onOk={this.handleOk}
                        onCancel={this.handleCancel}
                        footer={[
                            <Button key="submit" type="primary" onClick={this.handleOk}>
                                确定
                            </Button>,
                            <Button key="back" loading={loading} onClick={this.handleCance1}>
                                取消
                            </Button>,
                        ]}
                    >
                        <p>确认要删除吗？</p>
                    </Modal>
                </div>
                <div className="edit">
                    <Modal
                        visible={visible1}
                        title="编辑"
                        onOk={this.handleOk1}
                        onCancel={this.handleCance1}
                        footer={[
                            <Button key="submit" loading={loading} type="primary" onClick={this.handleOk1}>
                                确定
                            </Button>,
                            <Button key="back" onClick={this.handleCance1}>
                                取消
                            </Button>,
                        ]}
                    >题目要求：<Input value={editcurrentlist.title}
                        onInput={(e: any) => {
                            editcurrentlist.title = e.target.value
                            this.setState({
                                editcurrentlist
                            })

                        }} />
                        A：<Input value={editcurrentlist.A}
                            onInput={(e: any) => {
                                editcurrentlist.A = e.target.value
                                this.setState({
                                    editcurrentlist
                                })

                            }} />
                        B：<Input value={editcurrentlist.B}
                            onInput={(e: any) => {
                                editcurrentlist.B = e.target.value
                                this.setState({
                                    editcurrentlist
                                })

                            }} />
                        C：<Input value={editcurrentlist.C}
                            onInput={(e: any) => {
                                editcurrentlist.C = e.target.value
                                this.setState({
                                    editcurrentlist
                                })

                            }} />
                        D：<Input value={editcurrentlist.D}
                            onInput={(e: any) => {
                                editcurrentlist.D = e.target.value
                                this.setState({
                                    editcurrentlist
                                })

                            }} />
                        正确答案：<Input value={editcurrentlist.real}
                            onInput={(e: any) => {
                                editcurrentlist.real = e.target.value
                                this.setState({
                                    editcurrentlist
                                })

                            }} />
                        阶段： <Select defaultValue={name && name} style={{ width: 120 }} >
                            {
                                jdList.map((item: any, index: any) => {
                                    return <Option onClick={() => { this.handIndex(index) }} value={item.name}>{item.name}</Option>
                                })
                            }
                        </Select>
                    </Modal>
                </div>
                <div className="add">
                    <Modal
                        visible={visible2}
                        title="增加"
                        onOk={this.handleOk2}
                        onCancel={this.handleCance2}
                        footer={[
                            <Button key="submit" loading={loading} type="primary" onClick={this.handleOk2}>
                                确定
                            </Button>,
                            <Button key="back" onClick={this.handleCance2}>
                                取消
                            </Button>,
                        ]}
                    >题目要求：<Input value={editcurrentlist1.title}
                        onInput={(e: any) => {
                            editcurrentlist1.title = e.target.value
                            this.setState({
                                editcurrentlist1
                            })

                        }} />
                        A：<Input value={editcurrentlist1.A}
                            onInput={(e: any) => {
                                editcurrentlist1.A = e.target.value
                                this.setState({
                                    editcurrentlist1
                                })

                            }} />
                        B：<Input value={editcurrentlist1.B}
                            onInput={(e: any) => {
                                editcurrentlist1.B = e.target.value
                                this.setState({
                                    editcurrentlist1
                                })

                            }} />
                        C：<Input value={editcurrentlist1.C}
                            onInput={(e: any) => {
                                editcurrentlist1.C = e.target.value
                                this.setState({
                                    editcurrentlist1
                                })

                            }} />
                        D：<Input value={editcurrentlist1.D}
                            onInput={(e: any) => {
                                editcurrentlist1.D = e.target.value
                                this.setState({
                                    editcurrentlist1
                                })

                            }} />
                        正确答案：<Input value={editcurrentlist1.real}
                            onInput={(e: any) => {
                                editcurrentlist1.real = e.target.value
                                this.setState({
                                    editcurrentlist1
                                })

                            }} />
                        阶段： <Select defaultValue={type != "" ? jdList[0].name : ""} style={{ width: 120 }} >
                            {
                                jdList.map((item: any, index: any) => {
                                    return <Option onClick={() => { this.handIndex(index) }} value={item.name}>{item.name}</Option>
                                })
                            }
                        </Select>
                    </Modal>

                </div>
            </>
        );
    }
}

export default index;
