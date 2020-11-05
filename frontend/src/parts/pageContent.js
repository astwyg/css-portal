import React from 'react'
import Jumbotron from 'react-bootstrap/Jumbotron'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Table from 'react-bootstrap/Table'
import ListGroup from 'react-bootstrap/ListGroup'
import Modal from 'react-bootstrap/Modal'

import url from '../configs/url'

const showList = contents => {
  return (<div>
    {
      contents.map((c, index) => {
        return <Row key={index}>
          <Col className="d-none d-sm-block" sm={3} style={{ textAlign: 'right' }}>{c[0]} {' : '}</Col>
          <Col className="d-none d-sm-block" sm={9}>{c[1]}</Col>
          <Col className="d-block d-sm-none" sm={12}>{c[0]} {' : '}</Col>
          <Col className="d-block d-sm-none" sm={12} style={{ textAlign: 'right' }}>{c[1]}</Col>
        </Row>
      })
    }
  </div>)
}

const repliesTable = replies => {
  return (
    <Table striped bordered hover style={{ marginTop: '15px' }}>
      <thead>
        <tr>
          <th>处理人</th>
          <th>处理时间</th>
          <th>处理意见</th>
        </tr>
      </thead>
      <tbody>
        {replies.map(reply => {
          if (reply.reply_content_type === 'html') {
            return (<tr>
              <td>{reply.reply_user}</td>
              <td>{(new Date(reply.reply_updated_at)).toLocaleString()}</td>
              <div dangerouslySetInnerHTML={{ __html: reply.reply_content }} />
            </tr>)
          }
        })}
      </tbody>
    </Table>
  )
}

class PageContent extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      ticketModalVisible: false,
      knowledgeModalVisible: false,
      tickets: [],
      currentTicketContent: '',
      knowledges: [],
      currentKnowledge: ''
    }
  }

  componentDidMount () {
    if (window.user) {
      fetch(url.saasApiGetTickets, {
        method: 'POST',
        body: JSON.stringify({
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
            this.setState({
              tickets: result.contents
            })
          }
        })

      fetch(url.saasApiGetKnowledges, {
        method: 'POST',
        body: JSON.stringify({
        }),
        headers: {
          'content-type': 'application/json'
        }
      })
        .then((res) => {
          return res.json()
        })
        .then((result) => {
          this.setState({ // udesk API, 一代不如一代, v2居然返回code=1000代表成功, 所以不再检查status.
            knowledges: result.knowledge_questions
          })
        })
    }
  }

  handleShowTicket (ticket) {
    const infoList = showList([
      ['工单id', ticket.id],
      ['标题', ticket.subject],
      ['状态', ticket.status],
      ['创建时间', (new Date(ticket.created_at)).toLocaleString()],
      ['最后更新', (new Date(ticket.updated_at)).toLocaleString()]
    ])
    const content = (<div>
      {infoList}
      {repliesTable(ticket.replies)}
    </div>)
    this.setState({ ticketModalVisible: true, currentTicketContent: content })
  }

  handleShowKnowledge (knowledge) {
    this.setState({ knowledgeModalVisible: true, currentKnowledge: <div dangerouslySetInnerHTML={{ __html: knowledge.content }} /> })
  }

  render () {
    return (
      <Container className="PageContent">
        <Row style={{
          textAlign: 'left'
        }}>
          <Jumbotron className='jumbotron-cover'>
            <div className='zoomIn animated'>
              <h1>欢迎!</h1>
              <p>
                飞腾新基建全国服务保障平台为广大合作伙伴提供一站式、全流程、多层次综合服务保障。 <br/>
                我们衷心期待与您共乘时代东风，共绘宏伟蓝图！
              </p>
              <p>
                成为会员，可以使用本平台全部功能，并可优先通过 <span className='important-text'>400-9221-666</span> 获取专家电话支持。
              </p>
              <p>
                <Button variant="primary" className='btn-read-more' onClick={() => window.open('/static/飞腾新基建全国服务保障平台使用指南.pdf', '_blank')}>查看使用指南</Button>
              </p>
            </div>
          </Jumbotron>
        </Row>
        <Row className='center-title'>
          <h4>专家在线咨询(工作日10点-16点)</h4>
        </Row>
        <Row className='center-title'>
          <div className="title-line"></div>
        </Row>
        <Row>
          {
            [
              // '方案咨询', '项目合作', '认证适配', '整机问题', '课题申报',
              // '产品销售', '赋能培训', '投融资相关', 'English Service', '其他问题'
              '方案咨询', '项目合作', '适配认证', '整机相关',
              '课题申报', '产品销售', '赋能培训', '其他问题'
            ].map((channel, index) => (
              <Col key={index} lg={3} sm={6} xs={6} style={{ margin: '1em 0' }}>
                <Button variant="light" className='btn-service'
                  onClick={() => {
                    window.user
                      ? window.open(`https://phytium.s2.udesk.cn/im_client/?web_plugin_id=28724?channel=${channel}${window.user.webim_sign}`, '_blank')
                      : alert('请先登录')
                  }}>{channel}</Button>
              </Col>
            ))
          }
        </Row>
        <Row className='center-title' style={{ marginTop: '2em' }}>
          <h4>我的工单</h4>
        </Row>
        <Row className='center-title'>
          <div className="title-line"></div>
        </Row>
        <Row>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>编号</th>
                <th>标题</th>
                <th>更新时间</th>
                <th>当前状态</th>
              </tr>
            </thead>
            <tbody>
              {window.user
                ? this.state.tickets.map(ticket => {
                  return (<tr>
                    <td>{ticket.id}</td>
                    <td><a href="#" onClick={() => this.handleShowTicket(ticket)}>{ticket.subject}</a></td>
                    <td>{(new Date(ticket.updated_at)).toLocaleDateString()}</td>
                    <td>{
                      ticket.status === 'open'
                        ? <Button variant="outline-danger" size='sm'
                          onClick={() => this.handleShowTicket(ticket)}>正在处理</Button>
                        : <Button variant="outline-dark" size='sm'
                          onClick={() => this.handleShowTicket(ticket)}>已完成</Button>
                    }</td>
                  </tr>)
                })
                : <tr>
                  <td colSpan="4">请登录后查看工单</td>
                </tr>
              }
            </tbody>
          </Table>
        </Row>
        <Row className='center-title' style={{ marginTop: '2em' }}>
          <h4>知识库</h4>
        </Row>
        <Row className='center-title'>
          <div className="title-line"></div>
        </Row>
        <Row>
          <ListGroup style={{
            width: '100%',
            textAlign: 'left'
          }}>
            {window.user
              ? this.state.knowledges.map(knowledge => {
                return (<ListGroup.Item action onClick={() => this.handleShowKnowledge(knowledge)} className='item-highlight' >
                  {knowledge.title}
                </ListGroup.Item>)
              })
              : <ListGroup.Item action className='item-highlight'>
                请登录后查看知识库
              </ListGroup.Item>
            }
          </ListGroup>
        </Row>

        <Modal show={this.state.ticketModalVisible} size='lg'
          onHide={() => this.setState({ ticketModalVisible: false, currentTicketContent: '' })}>
          <Modal.Header closeButton>
            <Modal.Title>工单详情</Modal.Title>
          </Modal.Header>
          <Modal.Body>{this.state.currentTicketContent}</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary"
              onClick={() => this.setState({ ticketModalVisible: false, currentTicketContent: '' })}>
              关闭
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal show={this.state.knowledgeModalVisible} size='lg'
          onHide={() => this.setState({ knowledgeModalVisible: false, currentKnowledge: '' })}>
          <Modal.Header closeButton>
            <Modal.Title>知识库详情</Modal.Title>
          </Modal.Header>
          <Modal.Body>{this.state.currentKnowledge}</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => this.setState({ knowledgeModalVisible: false, currentKnowledge: '' })}>
              关闭
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    )
  }
}

export default PageContent
