import React, { Component } from 'react';
import {connect} from 'dva'
import {getyou,shanchua,xiugaia,getzuoaqwe,getzuoaqweqwe} from '../../../api/index'
import { Table, Divider, Tag, Button, Modal, Select, Input,  Alert,message } from 'antd';

import { any } from 'prop-types';
const desc = ['terrible', 'bad', 'normal', 'good', 'wonderful'];
const { Option }:any = Select;
function handleChange(value:any) {
    console.log(`selected ${value}`);
  }
class index extends Component<any> {
      state = {
        email:'',
          ADname:'',
          type:'',
          type1:'',
          uid:'',
          datee:[],
          ADpassword:'',
            // eslint-disable-next-line
            columns: [
                {
                    title: '序号',
                    dataIndex: 'uid',
                    key: 'uid',
                    render: (text:any) => <a>{text}</a>,
                    sorter: (a: any, b: any) => a.uid.length - b.uid.length
                },
                {
                    title: '用户名',
                    dataIndex: 'ADname',
                    key: 'ADname',
                    sorter: (a: any, b: any) => a.ADname.length - b.ADname.length
                },
                
                // {
                //     title: '职位',
                //     key: 'type', dataIndex: 'type',
                // }, 
                {
                    title: '邮箱',
                    dataIndex: 'email',
                    key: 'email',
                    sorter: (a: any, b: any) => a.email.length - b.email.length
                },
                {
                    title: '操作',
                    render: (text:any, record:any) => (
                        <span>
                            <Button onClick={() => this.handleUpdate(text)}>修改</Button>
                                   
                            <Button onClick={() => this.handleDelete(text)}>删除</Button>
                        </span>
                    ),
                }
            ],
            // eslint-disable-next-line
            // @typescript-eslint/no-unused-expressions
            visibles:false, 
            visible: false,
            value: 3,
            visiblewqe:false,
            name: '', title: '', status: '', date: '', reader: ''   
    }
    render() {
      let {food:{getzuos}}=this.props;
   console.log(this.state.datee)
    //   console.log(this.props)
        let { visible,columns,ADname,visibles ,type,date,email,visiblewqe,type1}:any = this.state;
        return (
            <div>
                <Button type="primary" onClick={this.showModal}>添加</Button>
                <Modal
                    title="添加"
                    visible={visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <div>
                        姓名:<Input placeholder="请输入您的姓名" onChange={(e) => this.handleInput(e)} name='ADname' value={ADname}
                        />
                    </div>
                    <div>
                        密码:
                    <Input.Password
                                className="Password"
                                onChange={e => {
                                    this.setState({ password: e.target.value });
                                }}
                                placeholder="请输入密码"
                            />
                    </div>
                     
                    <div>
                        职位:<Select  style={{ width: 120 }} onChange={handleChange}>
                        {
                          this.state.datee.map((item:any,index:any)=>{
                              return     <Option onClick={()=>{this.handleChange(index)}} value={item.shenfen}>{item.shenfen}</Option>
                          })  
                        }
  
    
    </Select>
                        
                      
                    </div>
                 
                    <div>
                        邮箱:<Input onChange={(e) => this.handleInput(e)} name="email" value={email} ></Input>
                    </div>
                    <div>
                    </div>
                </Modal>
                <Modal
                        visible={visiblewqe}
                        onOk={this.handleOkss}
                        onCancel={this.handleCancelss}
                        title="删除"
                        footer={[
                            <Button key="submit" type="primary" onClick={this.handleOkss}>
                                确定
                            </Button>,
                            <Button key="back"  onClick={this.handleCancelss}>
                                取消
                            </Button>,
                        ]}
                    >
                        <p>确认要删除吗？</p>
                    </Modal>
                <Modal
                    title="修改"
                    visible={visibles}
                    onOk={this.handleOksss}
                    onCancel={this.handleCancelsss}
                    footer={[
                        <Button key="submit" type="primary" onClick={this.handleOksss}>
                            确定
                        </Button>,
                        <Button key="back" onClick={this.handleCancelsss}>
                            取消
                        </Button>,
                    ]}
                    >
                     <div>
                        姓名:<Input placeholder="" onChange={(e) => this.handleInput(e)} name='ADname' value={ADname}
                        />
                    </div>
                    <div>
                        密码:
                    <Input.Password
                                className="Password"
                                onChange={e => {
                                    this.setState({ password: e.target.value });
                                }}
                                placeholder="请输入密码"
                            />
                    </div>
                    <div> 

                        职位:<Select  value={type1&&type1} style={{ width: 120 }} onChange={handleChange}>
                        {
                          this.state.datee.map((item:any,index:any)=>{
                              return     <Option onClick={()=>{this.handleChange(index,item.shenfen)}} value={item.shenfen}   >{item.shenfen}</Option>
                          })  
                        }
    </Select>
                      
                        
                        {/* <Input onChange={(e) => this.handleInput(e)} name="type" value={type} ></Input> */}
                    </div>
                    <div>
                        邮箱:<Input onChange={(e) => this.handleInput(e)} name="email" value={email} 
                        ></Input>
                    </div>
                 
                       </Modal>
                <Table columns={columns}   pagination={{ pageSize: 5 }} dataSource={this.props.food.getzuos&&this.props.food.getzuos} ></Table>
            </div>
        );
    }
    componentDidMount(){
        getzuoaqwe().then((res)=>{
            
          this.setState({
            datee:res.data.result
          })   
        })
      
    }
    // 事件驱动
    handleAdd = () => {
        this.showModal();
    }
    handleChange(index:any,item:any=null){
        console.log(123)
      this.setState({
          type1:item,

      })
      getzuoaqweqwe().then((res)=>{
        console.log(res.data)
    })
    }
    //添加
    showModal = () => {
        this.setState({
            visible: true,
        });
    
    };
    handleOk = () => {
        this.handleAdd()
        this.setState({
            visible: false,
        });
        let {ADname,type1,email,ADpassword}=this.state
        let testemail = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
        let testname=/^[a-zA-Z\d\u4e00-\u9fa5]{5,9}/;
        let zhengzeemail=testemail.test(email) 
        let zhengzename=testname.test(ADname)
        if(zhengzeemail&&zhengzename){
            getyou(ADname,type1,email,ADpassword)
            message.success('添加成功');
        }else {
            message.error('账户或邮箱输入错误,请重新输入！！！');
        }
        setTimeout(()=>{
            this.props.dispatch({type:"food/getzuo"})
         },100)
    };
    handleCancel = (e:any) => {
        this.setState({
            visible: false,
        });
    };
    //删除取消的框
    handleCancelss=()=>{
        this.setState({
            visiblewqe:false
        })
    }
  //删除确定的框
    handleOkss=()=>{
let{uid}=this.state;
  shanchua(uid)
  message.success('删除成功');
 setTimeout(()=>{
    this.props.dispatch({type:"food/getzuo"})
 },100)
    }
    //编辑的框
    handleOksss = (e:any) => {
        console.log(e);
        this.setState({
            visibles:true
           })
           let {ADname,type,uid,email}=this.state
           let testemail = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
           let testname=/^[a-zA-Z\d\u4e00-\u9fa5]{5,9}/;
           let zhengzeemail=testemail.test(email)
           let zhengzename=testname.test(ADname)
           if(zhengzeemail&&zhengzename){
               xiugaia(ADname,type,uid,email)
               message.success('修改成功');
           }else {
               message.error('账户或邮箱输入错误,请重新输入！！！');
           }
        setTimeout(()=>{
            this.props.dispatch({type:"food/getzuo"})
         },100)
    };
    handleCancelsss = (e:any) => {
        console.log(e);
        this.setState({
            visibles: false,
        });
    };
    // 双向绑定
    handleInput = (e:any) => {
        this.setState({
            [e.target.name]: e.target.value
        })
        setTimeout(()=>{
            console.log(this.state)
        },100)
    }
    onChange = (a:any, b:any) => {
        this.setState({
            date: a
        })
    }
    // 修改
    handleUpdate = (payload:any) => {
        let {datee}:any=this.state
         console.log(datee)
        this.setState({
            type1:datee[payload.type].shenfen,
            visibles: true,
            ADname:payload.ADname,
            type:payload.type,
           uid:payload.uid,
           email:payload.email
        });  
    }
    // 删除
    handleDelete = (payload:any) => {
        this.setState({
            visiblewqe:true,
            uid:payload.uid
        })
        // let {uid}=payload
        // shanchua(uid)
        // this.props.dispatch({type:"food/getzuo"}) 
    }
    //视图权限
//     handleShitu(text:any){

// this.setState({
//     type:text.type
    
// })
// console.log(text.type);

//     }
//     //菜单权限
//     handleCaidan(text:any){}
}
export default connect ((store:any)=>{
    return store;
})(index);