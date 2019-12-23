import React, { Component } from 'react';
import axios from 'axios';
import WhithOut from '../../../../component/without';
import { Layout, Table } from 'antd';
import './index.css';
const { Content, Footer } = Layout;

export class index extends Component<any> {
    state = {
        topicList: [],
        loading: false,
        visible: false,
        collapsed: false,
        typelist: [],
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
                title: '操作',
                key: 'action',
                render: (text: any, record: any) => (
                    <span>
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
    showModal = (text: any) => {
        this.setState({
            visible: true,
        });
    };
    componentDidMount() {
        let {
            history: {
                location: {
                    state: { classData },
                },
            },
        } = this.props;
        axios
            .post('http://localhost:7001/class/classtopic', {
                className: classData.name,
            })
            .then(res => {
                console.log(res, 'res--------res---------');

                this.setState({ topicList: res.data.data });
            });
    }
    render() {
        let { list, columns, topicList }: any = this.state;
        const { visible, loading } = this.state;
        let {
            history: {
                location: {
                    state: { classData },
                },
            },
        } = this.props;
        return (
            <div className="Class_Topic">
                <div className="class_poric_nav">
                    <h2>{classData.name}班级已有试题</h2>
                    <h3>
                        <span>班级讲师：{classData.address}</span>
                        <span>所处阶段：{classData.classStageText}</span>
                        <span>课程名称：{classData.CourseTitle}</span>
                    </h3>
                </div>
                <div className="class_poric_content">
                    {topicList.length > 0 ? (
                        <Layout>
                            <Content style={{ margin: '0 16px' }}>
                                <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
                                    <Table
                                        dataSource={topicList}
                                        pagination={{ pageSize: 6 }}
                                        columns={columns}
                                    />
                                </div>

                                <Footer style={{ textAlign: 'center' }}>
                                    1704C-考试管理系统04 Design ©2018 Created by 1704C{' '}
                                </Footer>
                            </Content>
                        </Layout>
                    ) : (
                        <WhithOut></WhithOut>
                    )}
                </div>
            </div>
        );
    }
}

export default index;
