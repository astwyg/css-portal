import React from 'react'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Modal from 'react-bootstrap/Modal'
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import Form from 'react-bootstrap/Form'

import url from '../configs/url'

class PageNav extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      registModalVisible: false,
      userinfoModalVisible: false,
      loginModalVisible: false
    }

    this.newUserForm = {
      inviteCode: React.createRef(),
      company: React.createRef(),
      title: React.createRef(),
      name: React.createRef(),
      phone: React.createRef(),
      email: React.createRef(),
      passwd: React.createRef(),
      agree: React.createRef()
    }
    this.loginForm = {
      phone: React.createRef(),
      passwd: React.createRef()
    }
    this.userInfoForm = {
      company: React.createRef(),
      title: React.createRef(),
      name: React.createRef(),
      phone: React.createRef(),
      email: React.createRef(),
      passwd: React.createRef()
    }
  }

  handleLogout () {
    fetch(url.logout, {
      method: 'POST',
      body: JSON.stringify({}),
      headers: {
        'content-type': 'application/json'
      }
    })
      .then((res) => {
        return res.json()
      })
      .then((result) => {
        if (result.status) {
          alert(result.message)
        } else {
          window.location.reload(false)
        }
      })
  }

  handleLoadUserinfo () {
    this.setState({
      userinfoModalVisible: true
    }, () => {
      this.userInfoForm.company.current.value = window.user.company
      this.userInfoForm.name.current.value = window.user.name
      this.userInfoForm.phone.current.value = window.user.phone
      this.userInfoForm.email.current.value = window.user.email
      this.userInfoForm.title.current.value = window.user.title
    })
  }

  handleCreateUser () {
    if (!this.newUserForm.agree.current.checked) {
      alert('您需要同意飞腾新基建服务保证联盟章程才能注册本平台.')
      return
    }
    if (!this.newUserForm.title.current.value) {
      alert('请输入职位')
      return
    }
    if (!this.newUserForm.name.current.value) {
      alert('请输入姓名')
      return
    }
    if (!this.newUserForm.phone.current.value || this.newUserForm.phone.current.value.length !== 11) {
      alert('请正确输入11位手机号')
      return
    }
    if (!this.newUserForm.email.current.value) {
      alert('请输入邮箱')
      return
    }
    if (!this.newUserForm.passwd.current.value) {
      alert('请输入服务密码')
      return
    }
    fetch(url.users, {
      method: 'POST',
      body: JSON.stringify({
        inviteCode: this.newUserForm.inviteCode.current.value,
        name: this.newUserForm.name.current.value,
        phone: this.newUserForm.phone.current.value,
        email: this.newUserForm.email.current.value,
        passwd: this.newUserForm.passwd.current.value,
        company: this.newUserForm.company.current.value,
        title: this.newUserForm.title.current.value
      }),
      headers: {
        'content-type': 'application/json'
      }
    })
      .then((res) => {
        return res.json() // 请求成功，获请求元数据
      })
      .then((result) => {
        if (result.status === 0) {
          alert(result.message)
          window.location.reload(false)
        } else {
          if (result.message) {
            alert(result.message)
          } else {
            alert('发生了未知的服务器错误, 请联系400客服.')
          }
        }
      })
  }

  handleCheckInviteCode () {
    if (this.newUserForm.inviteCode.current.value.length !== 8) {
      this.newUserForm.company.current.value = '请正确输入8位邀请码'
    } else {
      fetch(url.checkInviteCode, {
        method: 'POST',
        body: JSON.stringify({
          code: this.newUserForm.inviteCode.current.value
        }),
        headers: {
          'content-type': 'application/json'
        }
      })
        .then((res) => {
          return res.json()
        })
        .then((result) => {
          if (result.status) {
            alert(result.message)
          } else {
            this.newUserForm.company.current.value = result.message
          }
        })
    }
  }

  handleLogin () {
    if (!this.loginForm.phone.current.value || this.loginForm.phone.current.value.length !== 11) {
      alert('请正确输入13位手机号')
      return
    }
    if (!this.loginForm.passwd.current.value) {
      alert('请输入服务密码')
      return
    }
    fetch(url.login, {
      method: 'POST',
      body: JSON.stringify({
        phone: this.loginForm.phone.current.value,
        passwd: this.loginForm.passwd.current.value
      }),
      headers: {
        'content-type': 'application/json'
      }
    })
      .then((res) => {
        return res.json()
      })
      .then((result) => {
        console.log(result)
        if (result.status) {
          alert(result.message)
        } else {
          window.location.reload(false)
        }
      })
  }

  handleUpdateUserInfo () {
    fetch(url.updateUserInfo, {
      method: 'POST',
      body: JSON.stringify({
        title: this.userInfoForm.title.current.value,
        name: this.userInfoForm.name.current.value,
        email: this.userInfoForm.email.current.value,
        phone: this.userInfoForm.phone.current.value,
        passwd: this.userInfoForm.passwd.current.value
      }),
      headers: {
        'content-type': 'application/json'
      }
    })
      .then((res) => {
        return res.json()
      })
      .then((result) => {
        if (result.status) {
          alert(result.message)
        } else {
          window.location.reload(false)
        }
      })
  }

  render () {
    return (
      <Container>
        <Row>
          <Col xs={12} sm={6} style={{ textAlign: 'right', margin: '2em' }}>
            <Row> <img src="/static/img/logo2.png" alt="logo"/> <span className='header-title'>飞腾新基建服务保障平台</span> </Row>
          </Col>
          <Col xs={12} sm={6} style={{ textAlign: 'right', flex: 1, margin: '2em' }}>
            {
              window.user
                ? <><Button variant="secondary" size='sm' onClick={() => this.handleLoadUserinfo()}>用户信息</Button></>
                : <>
                  <Button variant="secondary" size='sm' onClick={() => this.setState({ loginModalVisible: true })}>登录</Button>
                  <Button variant="secondary" size='sm' onClick={() => this.setState({ registModalVisible: true })}>注册</Button>
                </>
            }
          </Col>
        </Row>

        <Modal show={this.state.registModalVisible} onHide={() => this.setState({ registModalVisible: false })}>
          <Modal.Header closeButton>
            <Modal.Title>欢迎注册飞腾新基建服务保证平台</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Tabs defaultActiveKey="invite">
              <Tab eventKey="invite" title="邀请注册">
                <br/>
                <Form>
                  <Form.Group as={Row}>
                    <Form.Label column sm={3} controlId="inviteCode" style={{ textAlign: 'right' }}>
                      邀请码
                    </Form.Label>
                    <Col sm={9}>
                      <Form.Control required ref={this.newUserForm.inviteCode}
                        onChange={() => this.handleCheckInviteCode()} placeholder="如果没有申请码请使用自行申请"/>
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} controlId="company">
                    <Form.Label column sm={3} style={{ textAlign: 'right' }}>
                      公司
                    </Form.Label>
                    <Col sm={9}>
                      <Form.Control disabled required ref={this.newUserForm.company} placeholder="填写邀请码后自动识别"/>
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} controlId="title">
                    <Form.Label column sm={3} style={{ textAlign: 'right' }}>
                      职位
                    </Form.Label>
                    <Col sm={9}>
                      <Form.Control required ref={this.newUserForm.title} placeholder=""/>
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} controlId="realname">
                    <Form.Label column sm={3} style={{ textAlign: 'right' }}>
                      姓名
                    </Form.Label>
                    <Col sm={9}>
                      <Form.Control required ref={this.newUserForm.name} placeholder=""/>
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} controlId="phone">
                    <Form.Label column sm={3} style={{ textAlign: 'right' }}>
                      手机号
                    </Form.Label>
                    <Col sm={9}>
                      <Form.Control required ref={this.newUserForm.phone} placeholder=""/>
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} controlId="email">
                    <Form.Label column sm={3} style={{ textAlign: 'right' }}>
                      邮箱
                    </Form.Label>
                    <Col sm={9}>
                      <Form.Control ref={this.newUserForm.email} placeholder=""/>
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} controlId="passwd">
                    <Form.Label column sm={3} style={{ textAlign: 'right' }}>
                      服务密码
                    </Form.Label>
                    <Col sm={9}>
                      <Form.Control required ref={this.newUserForm.passwd} type="password" placeholder=""/>
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} controlId="formHorizontalCheck">
                    <Col sm={{ span: 2, offset: 3 }}>
                      <Form.Check ref={this.newUserForm.agree} label='同意'/>
                    </Col>
                    <Col>
                      <a href="#" onClick={() => window.open('/static/飞腾新基建服务保障联盟章程.pdf', '_blank')}>飞腾新基建服务保证联盟章程</a>
                    </Col>
                  </Form.Group>

                  <Form.Group as={Row}>
                    <Col sm={{ span: 4, offset: 3 }}>
                      <Button variant="primary" onClick={() => this.handleCreateUser()}>注册</Button>
                    </Col>
                  </Form.Group>
                </Form>
              </Tab>
              <Tab eventKey="diy" title="自行申请">
                <p>请按照如下步骤申请加入联盟:</p>
                <p>1. 下载 <a href="#" onClick={() => window.open('/static/飞腾新基建服务保障联盟申请表.docx', '_blank')}>飞腾新基建服务保障联盟申请表</a>并填写、打印、盖章、扫描</p>
                <p>2. 下载 <a href="#" onClick={() => window.open('/static/飞腾新基建服务保障联盟账号信息表.xlsx', '_blank')}>飞腾新基建服务保障联盟账号信息表</a>并填写</p>
                <p>3. 请将上述第1项扫描件和第2项电子档发邮件到<a href="mailto:pnic@phytium.com.cn">pnic@phytium.com.cn</a></p>
              </Tab>
            </Tabs>
          </Modal.Body>
        </Modal>

        <Modal show={this.state.userinfoModalVisible} onHide={() => this.setState({ userinfoModalVisible: false })}>
          <Modal.Header closeButton>
            <Modal.Title>修改用户信息</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <br/>
            <Form>
              <Form.Group as={Row} controlId="company">
                <Form.Label column sm={3} style={{ textAlign: 'right' }}>
                  公司
                </Form.Label>
                <Col sm={9}>
                  <Form.Control disabled required ref={this.userInfoForm.company}/>
                </Col>
              </Form.Group>
              <Form.Group as={Row} controlId="company">
                <Form.Label column sm={3} style={{ textAlign: 'right' }}>
                  职务
                </Form.Label>
                <Col sm={9}>
                  <Form.Control required ref={this.userInfoForm.title}/>
                </Col>
              </Form.Group>
              <Form.Group as={Row} controlId="realname">
                <Form.Label column sm={3} style={{ textAlign: 'right' }}>
                  姓名
                </Form.Label>
                <Col sm={9}>
                  <Form.Control required ref={this.userInfoForm.name}/>
                </Col>
              </Form.Group>
              <Form.Group as={Row} controlId="phone">
                <Form.Label column sm={3} style={{ textAlign: 'right' }}>
                  手机号
                </Form.Label>
                <Col sm={9}>
                  <Form.Control required ref={this.userInfoForm.phone}/>
                </Col>
              </Form.Group>
              <Form.Group as={Row} controlId="email">
                <Form.Label column sm={3} style={{ textAlign: 'right' }}>
                  邮箱
                </Form.Label>
                <Col sm={9}>
                  <Form.Control required ref={this.userInfoForm.email}/>
                </Col>
              </Form.Group>
              <Form.Group as={Row} controlId="passwd">
                <Form.Label column sm={3} style={{ textAlign: 'right' }}>
                  服务密码
                </Form.Label>
                <Col sm={9}>
                  <Form.Control required ref={this.userInfoForm.passwd} type="password" placeholder="请输入新密码"/>
                </Col>
              </Form.Group>
              <Form.Group as={Row}>
                <Col sm={{ span: 9, offset: 3 }}>
                  <Button variant="primary" onClick={() => this.handleUpdateUserInfo()}>更新用户信息</Button> {' '}
                  <Button variant="danger" onClick={(() => this.handleLogout())}>退出登录</Button>
                </Col>
              </Form.Group>
            </Form>
          </Modal.Body>
        </Modal>

        <Modal show={this.state.loginModalVisible} onHide={() => this.setState({ loginModalVisible: false })}>
          <Modal.Header closeButton>
            <Modal.Title>登录</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <br/>
            <Form>
              <Form.Group as={Row} controlId="phone">
                <Form.Label column sm={3} style={{ textAlign: 'right' }}>
                  手机号
                </Form.Label>
                <Col sm={8}>
                  <Form.Control required ref={this.loginForm.phone} placeholder="11位手机号"/>
                </Col>
              </Form.Group>
              <Form.Group as={Row} controlId="passwd">
                <Form.Label column sm={3} style={{ textAlign: 'right' }}>
                  服务密码
                </Form.Label>
                <Col sm={8}>
                  <Form.Control required ref={this.loginForm.passwd} type="password" placeholder="请输入密码"/>
                </Col>
              </Form.Group>
              <Form.Group as={Row}>
                <Col sm={{ span: 9, offset: 3 }}>
                  <Button variant="primary" onClick={() => this.handleLogin()}>登录</Button> {' '}
                </Col>
              </Form.Group>
            </Form>
          </Modal.Body>
        </Modal>
      </Container>
    )
  }
}

export default PageNav
