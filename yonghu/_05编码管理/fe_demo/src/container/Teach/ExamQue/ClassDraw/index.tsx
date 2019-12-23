import React, { Component } from 'react';
import axios from 'axios';
import './index.css';
import { Layout, Breadcrumb, Divider, Table, message } from 'antd';

const { Content, Footer } = Layout;
const key = 'updatable';

export class index extends Component<any> {
    state = { Classlist: [] };
    render() {
        const columns = [
            {
                title: '班级名称',
                dataIndex: 'name',
            },
            {
                title: '阶段名称',
                dataIndex: 'classStageText',
            },
            {
                title: '课程名称',
                dataIndex: 'CourseTitle',
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
                        <a>
                            <span onClick={this.AutoTopic.bind(this, text)}>自动出题</span>
                        </a>
                        <Divider type="vertical" />
                        <a>
                            <span onClick={this.HandTopic.bind(this, text)}>手动出题</span>
                        </a>
                        <Divider type="vertical" />
                        <a>
                            <span onClick={this.lookClassTopic.bind(this, text)}>查看已有题</span>
                        </a>
                    </span>
                ),
            },
        ];
        let { Classlist } = this.state;

        const rowSelection = {
            getCheckboxProps: (record: any) => ({
                disabled: record.name === 'Disabled User',
                name: record.name,
            }),
        };
        return (
            <div className="classDraw_main">
                <Layout>
                    <Content style={{ margin: '0 16px' }}>
                        <Breadcrumb style={{ margin: '16px 0' }}>
                            <Breadcrumb.Item>班级出题</Breadcrumb.Item>
                        </Breadcrumb>
                        <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
                            <Table
                                rowSelection={rowSelection}
                                columns={columns}
                                pagination={{ pageSize: 5 }}
                                dataSource={Classlist}
                            />
                        </div>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>
                        网站考试系统--------班级出题页面
                    </Footer>
                </Layout>
            </div>
        );
    }
    //查看班级已有题
    lookClassTopic(classData: any) {
        this.props.history.push('/classtopic', {
            classData,
        });
    }
    //自动出题
    async AutoTopic(ClassData: any) {
        let backdata = await axios.get(
            `http://localhost:7001/paper/come/elfMotion?topicNum=20&course=${ClassData.ClassStageNumber}&className=${ClassData.name}`
        );
        message.loading({ content: 'Loading...', key });
        setTimeout(() => {
            message.success({ content: backdata.data.msg, key, duration: 2 });
        }, 1000);
    }
    //手动出题
    HandTopic(data: any) {
        console.log(data, '出题');
    }

    componentDidMount() {
        this.getNewdata();
    }

    //获取数据
    getNewdata() {
        axios
            .get('http://localhost:7001/class', {
                headers: {
                    token: document.cookie.slice(6),
                },
            })
            .then(res => {
                let newArr: Array<any> = [];
                if (res.data.result) {
                    res.data.result.forEach((item: any, index: number) => {
                        let Newobject: any = {};
                        if (item.ClassStage == 0) {
                            Newobject.Stage = '实训一';
                        } else if (item.ClassStage == 1) {
                            Newobject.Stage = '实训二';
                        } else {
                            Newobject.Stage = '实训三';
                        }
                        newArr.push({
                            id: item.id,
                            key: index,
                            name: item.class_name,
                            CourseTitle: item.CourseTitle,
                            classStageText: Newobject.Stage,
                            ClassStageNumber: item.ClassStage,
                            address: item.teacher_name,
                        });
                    });
                }
                this.setState({
                    Classlist: newArr,
                });
            });
    }
}

export default index;
