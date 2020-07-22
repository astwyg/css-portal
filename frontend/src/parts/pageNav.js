import React from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Form from 'react-bootstrap/Form';

class PageNav extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      registModalVisible: false,
      userinfoModalVisible:false,
    }
  }

  handleLogout(){
    this.setState({
      userinfoModalVisible:false,
    })
  }
  handleLoadUserinfo(){
    this.setState({
      userinfoModalVisible:true,
    })
  }

  render(){
    return (
      <Container>
        <Row>
          <Col style={{
            textAlign: 'left',
            margin: '10px',
            fontSize: 'x-large'
          }}>
            <b>飞腾新基建服务保障平台</b>
          </Col>
          <Col className="buttons" style={{
            textAlign: 'right',
            flex: 1,
            margin: '10px'
          }}>
            <Button variant="primary" onClick={() => this.setState({registModalVisible: true})}>注册</Button>{' '}
            <Button variant="primary" onClick={() => this.handleLoadUserinfo()}>用户信息</Button>{' '}
            <Button variant="success" onClick={()=>alert("等待对接云客服系统的web客服功能, 我们假设已经跳转了.")}>在线客服</Button>{' '}
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
                      <Form.Control required placeholder="如果没有申请码请使用自行注册"/>
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} controlId="company">
                    <Form.Label column sm={2}>
                      公司
                    </Form.Label>
                    <Col sm={10}>
                      <Form.Control disabled required placeholder="填写邀请码后自动识别"/>
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} controlId="realname">
                    <Form.Label column sm={2}>
                      姓名
                    </Form.Label>
                    <Col sm={10}>
                      <Form.Control required placeholder=""/>
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} controlId="phone">
                    <Form.Label column sm={2}>
                      手机号
                    </Form.Label>
                    <Col sm={10}>
                      <Form.Control required placeholder=""/>
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} controlId="email">
                    <Form.Label column sm={2}>
                      邮箱
                    </Form.Label>
                    <Col sm={10}>
                      <Form.Control placeholder=""/>
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} controlId="passwd">
                    <Form.Label column sm={2}>
                      服务密码
                    </Form.Label>
                    <Col sm={10}>
                      <Form.Control required type="password" placeholder=""/>
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} controlId="formHorizontalCheck">
                    <Col sm={{span: 2, offset: 2}}>
                      <Form.Check label='同意'/>
                    </Col>
                    <Col>
                      <a href="#">飞腾新基建服务保证联盟章程</a>
                    </Col>
                  </Form.Group>

                  <Form.Group as={Row}>
                    <Col sm={{span: 10, offset: 2}}>
                      <Button type="submit">注册</Button>
                    </Col>
                  </Form.Group>
                </Form>
              </Tab>
              <Tab eventKey="diy" title="自行申请">
                <p>请按照如下步骤申请加入联盟:</p>
                <p>1. 下载 <a href="#">飞腾新基建服务保障联盟申请表</a>并填写、打印、盖章、扫描</p>
                <p>2. 下载 <a href="#">飞腾新基建服务保障联盟账号信息表</a>并填写</p>
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
                      <Form.Control disabled required placeholder="长城?"/>
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} controlId="realname">
                    <Form.Label column sm={2}>
                      姓名
                    </Form.Label>
                    <Col sm={10}>
                      <Form.Control required placeholder="张三"/>
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} controlId="phone">
                    <Form.Label column sm={2}>
                      手机号
                    </Form.Label>
                    <Col sm={10}>
                      <Form.Control required placeholder="17710432234"/>
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} controlId="email">
                    <Form.Label column sm={2}>
                      邮箱
                    </Form.Label>
                    <Col sm={10}>
                      <Form.Control placeholder="aa@cj.cc"/>
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} controlId="passwd">
                    <Form.Label column sm={2}>
                      服务密码
                    </Form.Label>
                    <Col sm={10}>
                      <Form.Control required type="password" placeholder="请输入新密码"/>
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row}>
                    <Col sm={{span: 10, offset: 2}}>
                      <Button type="submit">更新用户信息</Button> {' '}
                      <Button variant="danger" onClick={(()=>this.handleLogout())}>注销</Button>
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