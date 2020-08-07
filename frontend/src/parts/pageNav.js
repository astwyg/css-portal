import React from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Form from 'react-bootstrap/Form';

import url from '../configs/url';

class PageNav extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      registModalVisible: false,
      userinfoModalVisible:false,
      loginModalVisible: false,
    };

    this.newUserForm = {
      inviteCode :React.createRef(),
      company: React.createRef(),
      name: React.createRef(),
      phone: React.createRef(),
      email: React.createRef(),
      passwd: React.createRef(),
      agree: React.createRef(),
    };
    this.loginForm = {
      phone : React.createRef(),
      passwd : React.createRef(),
    };
    this.userInfoForm = {
      company:React.createRef(),
      name:React.createRef(),
      phone:React.createRef(),
      email:React.createRef(),
      passwd:React.createRef(),
    };
  }

  handleLogout(){
    fetch(url.logout, {
        method: "POST",
        body: JSON.stringify({}),
        headers: {
          'content-type': 'application/json',
        }
      })
        .then((res) => {
          return res.json();
        })
        .then((result) => {
          if (result.status) {
            alert(result.message);
          } else{
            window.location.reload(false);
          }
        });

  }
  handleLoadUserinfo(){
    this.setState({
      userinfoModalVisible:true,
    }, ()=>{
      this.userInfoForm.company.current.value = window.user.company;
      this.userInfoForm.name.current.value = window.user.name;
      this.userInfoForm.phone.current.value = window.user.phone;
      this.userInfoForm.email.current.value = window.user.email;
    })
  }

  handleCreateUser() {
    if (!this.newUserForm.agree.current.checked) {
      alert("您需要同意飞腾新基建服务保证联盟章程才能注册本平台.");
      return;
    }
    fetch(url.users, {
      method: "POST",
      body: JSON.stringify({
        inviteCode: this.newUserForm.inviteCode.current.value,
        name: this.newUserForm.name.current.value,
        phone: this.newUserForm.phone.current.value,
        email: this.newUserForm.email.current.value,
        passwd: this.newUserForm.passwd.current.value,
        company: this.newUserForm.company.current.value,
      }),
      headers: {
        'content-type': 'application/json',
      }
    })
      .then((res) => {
        return res.json(); //请求成功，获请求元数据
      })
      .then((result) => {
        if(result.status){
          alert(result.message);
        } else {
          alert(result.message);
          window.location.reload(false);
        }
      });

  }
  handleCheckInviteCode(){
    if(this.newUserForm.inviteCode.current.value.length !==7 ){
      this.newUserForm.company.current.value = '请正确输入7位邀请码'
    }
    else{
      fetch(url.checkInviteCode, {
        method: "POST",
        body: JSON.stringify({
          code: this.newUserForm.inviteCode.current.value,
        }),
        headers: {
          'content-type': 'application/json',
        }
      })
        .then((res) => {
          return res.json();
        })
        .then((result) => {
          if (result.status) {
            alert(result.message);
          } else {
            this.newUserForm.company.current.value = result.message;
          }
        });
    }
  }
  handleLogin(){
    fetch(url.login, {
        method: "POST",
        body: JSON.stringify({
          phone: this.loginForm.phone.current.value,
          passwd: this.loginForm.passwd.current.value,
        }),
        headers: {
          'content-type': 'application/json',
        }
      })
        .then((res) => {
          return res.json();
        })
        .then((result) => {
          console.log(result);
          if (result.status) {
            alert(result.message);
          } else{
            window.location.reload(false);
          }
        });
  }
  handleUpdateUserInfo(){
    fetch(url.updateUserInfo, {
        method: "POST",
        body: JSON.stringify({
          name: this.userInfoForm.name.current.value,
          email: this.userInfoForm.email.current.value,
          phone: this.userInfoForm.phone.current.value,
          passwd: this.userInfoForm.passwd.current.value,
        }),
        headers: {
          'content-type': 'application/json',
        }
      })
        .then((res) => {
          return res.json();
        })
        .then((result) => {
          if (result.status) {
            alert(result.message);
          } else{
            window.location.reload(false);
          }
        });
  }

  render(){
    return (
      <Container>
        <Row>
          <Col xs={12} sm={4} style={{
            textAlign: 'left',
            margin: '10px',
            fontSize: 'large'
          }}>
            <b>飞腾新基建服务保障平台</b>
          </Col>
          <Col xs={12} sm={8} style={{
            textAlign: 'right',
            flex: 1,
            margin: '10px'
          }}>
            {
              window.user?
                 <><Button variant="primary" size='sm' onClick={() => this.handleLoadUserinfo()}>用户信息</Button>{' '}</>
              :<>
                <Button variant="primary" size='sm'
                    onClick={() => this.setState({loginModalVisible: true})}>登录</Button>{' '}
                <Button variant="primary" size='sm'
                    onClick={() => this.setState({registModalVisible: true})}>注册</Button>{' '}
              </>
            }
          </Col>
        </Row>

        <Modal show={this.state.registModalVisible} onHide={() => this.setState({registModalVisible: false})}>
          <Modal.Header closeButton>
            <Modal.Title>欢迎注册飞腾新基建服务保证平台</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Tabs defaultActiveKey="invite">
              <Tab eventKey="invite" title="邀请注册">
                <br/>
                <Form>
                  <Form.Group as={Row}>
                    <Form.Label column sm={2} controlId="inviteCode">
                      邀请码
                    </Form.Label>
                    <Col sm={10}>
                      <Form.Control required ref={this.newUserForm.inviteCode}
                                    onChange={() => this.handleCheckInviteCode()} placeholder="如果没有申请码请使用自行注册"/>
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} controlId="company">
                    <Form.Label column sm={2}>
                      公司
                    </Form.Label>
                    <Col sm={10}>
                      <Form.Control disabled required ref={this.newUserForm.company} placeholder="填写邀请码后自动识别"/>
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} controlId="realname">
                    <Form.Label column sm={2}>
                      姓名
                    </Form.Label>
                    <Col sm={10}>
                      <Form.Control required ref={this.newUserForm.name} placeholder=""/>
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} controlId="phone">
                    <Form.Label column sm={2}>
                      手机号
                    </Form.Label>
                    <Col sm={10}>
                      <Form.Control required ref={this.newUserForm.phone} placeholder=""/>
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} controlId="email">
                    <Form.Label column sm={2}>
                      邮箱
                    </Form.Label>
                    <Col sm={10}>
                      <Form.Control ref={this.newUserForm.email} placeholder=""/>
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} controlId="passwd">
                    <Form.Label column sm={2}>
                      服务密码
                    </Form.Label>
                    <Col sm={10}>
                      <Form.Control required ref={this.newUserForm.passwd} type="password" placeholder=""/>
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} controlId="formHorizontalCheck">
                    <Col sm={{span: 2, offset: 2}}>
                      <Form.Check ref={this.newUserForm.agree} label='同意'/>
                    </Col>
                    <Col>
                      <a href="#">飞腾新基建服务保证联盟章程</a>
                    </Col>
                  </Form.Group>

                  <Form.Group as={Row}>
                    <Col sm={{span: 10, offset: 2}}>
                      <Button variant="primary" onClick={() => this.handleCreateUser()}>注册</Button>
                    </Col>
                  </Form.Group>
                </Form>
              </Tab>
              <Tab eventKey="diy" title="自行申请">
                <p>请按照如下步骤申请加入联盟:</p>
                <p>1. 下载 <a href="#" onClick={()=>window.open("/static/飞腾新基建服务保障联盟申请表.docx","_blank")}>飞腾新基建服务保障联盟申请表</a>并填写、打印、盖章、扫描</p>
                <p>2. 下载 <a href="#" onClick={()=>window.open("/static/飞腾新基建服务保障联盟账号信息表.xlsx","_blank")}>飞腾新基建服务保障联盟账号信息表</a>并填写</p>
                <p>3. 请将上述第1项扫描件和第2项电子档发邮件到xjj@phytium.com.cn</p>
              </Tab>
            </Tabs>
          </Modal.Body>
        </Modal>

        <Modal show={this.state.userinfoModalVisible} onHide={() => this.setState({userinfoModalVisible: false})}>
          <Modal.Header closeButton>
            <Modal.Title>修改用户信息</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <br/>
            <Form>
              <Form.Group as={Row} controlId="company">
                <Form.Label column sm={2}>
                  公司
                </Form.Label>
                <Col sm={10}>
                  <Form.Control disabled required ref={this.userInfoForm.company}/>
                </Col>
              </Form.Group>
              <Form.Group as={Row} controlId="realname">
                <Form.Label column sm={2}>
                  姓名
                </Form.Label>
                <Col sm={10}>
                  <Form.Control required ref={this.userInfoForm.name}/>
                </Col>
              </Form.Group>
              <Form.Group as={Row} controlId="phone">
                <Form.Label column sm={2}>
                  手机号
                </Form.Label>
                <Col sm={10}>
                  <Form.Control required ref={this.userInfoForm.phone}/>
                </Col>
              </Form.Group>
              <Form.Group as={Row} controlId="email">
                <Form.Label column sm={2}>
                  邮箱
                </Form.Label>
                <Col sm={10}>
                  <Form.Control required ref={this.userInfoForm.email}/>
                </Col>
              </Form.Group>
              <Form.Group as={Row} controlId="passwd">
                <Form.Label column sm={2}>
                  服务密码
                </Form.Label>
                <Col sm={10}>
                  <Form.Control required ref={this.userInfoForm.passwd} type="password" placeholder="请输入新密码"/>
                </Col>
              </Form.Group>
              <Form.Group as={Row}>
                <Col sm={{span: 10, offset: 2}}>
                  <Button variant="primary" onClick={() => this.handleUpdateUserInfo()}>更新用户信息</Button> {' '}
                  <Button variant="danger" onClick={(() => this.handleLogout())}>注销</Button>
                </Col>
              </Form.Group>
            </Form>
          </Modal.Body>
        </Modal>

        <Modal show={this.state.loginModalVisible} onHide={() => this.setState({loginModalVisible: false})}>
          <Modal.Header closeButton>
            <Modal.Title>登录</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <br/>
            <Form>
              <Form.Group as={Row} controlId="phone">
                <Form.Label column sm={3}>
                  手机号
                </Form.Label>
                <Col sm={8}>
                  <Form.Control required ref={this.loginForm.phone} placeholder="11位手机号"/>
                </Col>
              </Form.Group>
              <Form.Group as={Row} controlId="passwd">
                <Form.Label column sm={3}>
                  服务密码
                </Form.Label>
                <Col sm={8}>
                  <Form.Control required ref={this.loginForm.passwd} type="password" placeholder="请输入密码"/>
                </Col>
              </Form.Group>
              <Form.Group as={Row}>
                <Col sm={{span: 9, offset: 3}}>
                  <Button variant="primary"  onClick={() => this.handleLogin()}>登录</Button> {' '}
                </Col>
              </Form.Group>
            </Form>
          </Modal.Body>
        </Modal>
      </Container>
    );
  }
}


export default PageNav;