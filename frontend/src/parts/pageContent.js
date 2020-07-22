import React from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Button from 'react-bootstrap/Button';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import ListGroup from 'react-bootstrap/ListGroup';
import Tab from 'react-bootstrap/Tab';
import Modal from 'react-bootstrap/Modal';

function alertClicked() {
  alert('You clicked the third ListGroupItem');
}

class PageContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ticketModalVisible:false,
      knowledgeModalVisible:false,
    }
  }

  handleShowTicket(){
    this.setState({ticketModalVisible:true})
  }

  handleShowKnowledge(){
    this.setState({knowledgeModalVisible:true})
  }

  render(){
    return (
      <Container className="PageContent">
        <Row style={{
          textAlign: "left"
        }}>
          <Jumbotron>
            <h1>欢迎!</h1>
            <p>
              随着我国新基建和信息应用技术创新等领域不断发展，
              天津飞腾信息技术有限公司希望可以为生态伙伴在新基建进程中，
              提供更好的咨询服务、技术支持和售后保障服务，并形成常态化和信息化支撑机制，
              因此，决定成立飞腾新基建服务保障联盟。
            </p>
            <p>
              成为飞腾新基建服务保障联盟会员，可以使用本平台全部功能，并可优先通过400-xxxx获取专家电话支持。
            </p>
            <p>
              <Button variant="primary">查看联盟章程</Button>
            </p>
          </Jumbotron>
        </Row>
        <Row>
          <b>我的工单:</b>
        </Row>
        <Row>
          <Table striped bordered hover>
            <thead>
            <tr>
              <th>类型</th>
              <th>标题</th>
              <th>时间</th>
              <th>状态</th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td>咨询</td>
              <td>FT-2000/64有几个核?</td>
              <td>2020/7/30</td>
              <td><Button variant="outline-success" size='sm' onClick={()=>this.handleShowTicket()}>已完成</Button>{' '}</td>
            </tr>
            <tr>
              <td>项目合作</td>
              <td>津南密码项目合作</td>
              <td>2020/7/30</td>
              <td><Button variant="outline-danger" size='sm' onClick={()=>this.handleShowTicket()}>正在处理</Button>{' '}</td>
            </tr>
            </tbody>
          </Table>
        </Row>
        <Row>
          <b>知识库:</b>
        </Row>
        <Row>
          <ListGroup style={{
            width: "100%",
            textAlign: 'left'
          }}>
            <ListGroup.Item action onClick={()=>this.handleShowKnowledge()}>
              飞腾新基建服务联盟章程
            </ListGroup.Item>
            <ListGroup.Item action onClick={()=>this.handleShowKnowledge()}>
              飞腾CPU100问
            </ListGroup.Item>
            <ListGroup.Item action onClick={()=>this.handleShowKnowledge()}>
              飞腾CPU适配列表
            </ListGroup.Item>
          </ListGroup>,
        </Row>

        <Modal show={this.state.ticketModalVisible} onHide={()=>this.setState({ticketModalVisible:false})}>
        <Modal.Header closeButton>
          <Modal.Title>工单详情</Modal.Title>
        </Modal.Header>
        <Modal.Body>等待对接SaaS客服系统, 我们假设这里显示了工单流转信息</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={()=>this.setState({ticketModalVisible:false})}>
            关闭
          </Button>
        </Modal.Footer>
      </Modal>

        <Modal show={this.state.knowledgeModalVisible} onHide={()=>this.setState({knowledgeModalVisible:false})}>
        <Modal.Header closeButton>
          <Modal.Title>知识库详情</Modal.Title>
        </Modal.Header>
        <Modal.Body>等待对接SaaS客服系统, 我们假设这里显示了知识库信息</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={()=>this.setState({knowledgeModalVisible:false})}>
            关闭
          </Button>
        </Modal.Footer>
      </Modal>

      </Container>
    );
  }
}


export default PageContent;