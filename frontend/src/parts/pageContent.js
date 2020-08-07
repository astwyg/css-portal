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
import url from "../configs/url";


const showList = contents =>{
  return (<div>
    {
      contents.map(c => {
        return <Row>
          <Col className="d-none d-sm-block" sm={3} style={{textAlign:"right"}}>{c[0]} {' : '}</Col>
          <Col className="d-none d-sm-block" sm={9}>{c[1]}</Col>
          <Col className="d-block d-sm-none" sm={12}>{c[0]} {' : '}</Col>
          <Col className="d-block d-sm-none" sm={12} style={{textAlign:"right"}}>{c[1]}</Col>
        </Row>
      })
    }
  </div>)
};

const repliesTable = replies=>{
  return(
    <Table striped bordered hover style={{marginTop:"15px"}}>
      <thead>
        <tr>
          <th>处理人</th>
          <th>处理时间</th>
          <th>处理意见</th>
        </tr>
      </thead>
      <tbody>
      {replies.map(reply=>{
        if(reply.reply_content_type === "html"){
          return (<tr>
            <td>{reply.reply_user}</td>
            <td>{(new Date(reply.reply_updated_at)).toLocaleString()}</td>
            <div dangerouslySetInnerHTML={{__html:reply.reply_content}} />
          </tr>)
        }
      })}
      </tbody>
    </Table>
  )
}

class PageContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ticketModalVisible:false,
      knowledgeModalVisible:false,
      tickets:[],
      currentTicketContent:"",
      knowledges:[],
      currentKnowledge:"",
    }
  }

  componentDidMount(){
    if(window.user){
      fetch(url.saasApiGetTickets, {
        method: "POST",
        body: JSON.stringify({
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
            this.setState({
              tickets: result.contents
            })
          }
        });

      fetch(url.saasApiGetKnowledges, {
        method: "POST",
        body: JSON.stringify({
        }),
        headers: {
          'content-type': 'application/json',
        }
      })
        .then((res) => {
          return res.json();
        })
        .then((result) => {
          this.setState({ //udesk API, 一代不如一代, v2居然返回code=1000代表成功, 所以不再检查status.
            knowledges: result.knowledge_questions
          })
        });
    }
  }

  handleShowTicket(ticket){
    let infoList = showList([
      ["工单id", ticket.id],
      ["标题", ticket.subject],
      ["状态", ticket.status],
      ["创建时间", (new Date(ticket.created_at)).toLocaleString()],
      ["最后更新", (new Date(ticket.updated_at)).toLocaleString()]
    ]);
    let content = (<div>
      {infoList}
      {repliesTable(ticket.replies)}
    </div>);
    this.setState({ticketModalVisible:true, currentTicketContent:content});
  }

  handleShowKnowledge(knowledge){
    this.setState({knowledgeModalVisible:true, currentKnowledge: <div dangerouslySetInnerHTML={{__html:knowledge.content}} />});
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
                <Button variant="primary" onClick={()=>window.open("/static/飞腾新基建服务保障联盟章程.pdf","_blank")}>查看联盟章程</Button>
            </p>
          </Jumbotron>
        </Row>
        <Row>
          <b>专家在线咨询(工作日10点-16点):</b>
        </Row>
        <Row>{
              ["方案咨询","项目合作","整机问题","其他问题"].map(channel=>(
                <Col sm={3} xs={6} style={{margin:"15px 0 0 0"}}>
                    <Button variant="success" size='lg' block
                          onClick={() => {
                            window.user?
                              window.open(`https://1396609.s2.udesk.cn/im_client/?web_plugin_id=28724?channel=${channel}`,"_blank"):
                              alert("请先登录");
                          }}>{channel}</Button>
                </Col>
          ))
        }
        </Row>
        <Row style={{marginTop:25}}>
          <b>我的工单:</b>
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
            {window.user ?
              this.state.tickets.map(ticket => {
                return (<tr>
                  <td>{ticket.id}</td>
                  <td><a href="#" onClick={() => this.handleShowTicket(ticket)}>{ticket.subject}</a></td>
                  <td>{(new Date(ticket.updated_at)).toLocaleDateString()}</td>
                  <td>{
                    ticket.status === 'open' ?
                      <Button variant="outline-danger" size='sm'
                              onClick={() => this.handleShowTicket(ticket)}>正在处理</Button>
                      :
                      <Button variant="outline-success" size='sm'
                              onClick={() => this.handleShowTicket(ticket)}>已完成</Button>
                  }</td>
                </tr>)
              })
              : <tr>
                <td colspan="4">请登录后查看工单</td>
              </tr>
            }
            </tbody>
          </Table>
        </Row>
        <Row style={{marginTop:25}}>
          <b>知识库:</b>
        </Row>
        <Row>
          <ListGroup style={{
            width: "100%",
            textAlign: 'left'
          }}>
            {window.user ?
              this.state.knowledges.map(knowledge => {
                return (<ListGroup.Item action onClick={() => this.handleShowKnowledge(knowledge)}>
                  {knowledge.title}
                </ListGroup.Item>)
              })
              : <ListGroup.Item action>
                请登录后查看知识库
              </ListGroup.Item>
            }
          </ListGroup>
        </Row>

        <Modal show={this.state.ticketModalVisible} size='lg'
               onHide={() => this.setState({ticketModalVisible: false, currentTicketContent: ""})}>
          <Modal.Header closeButton>
            <Modal.Title>工单详情</Modal.Title>
          </Modal.Header>
          <Modal.Body>{this.state.currentTicketContent}</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary"
                    onClick={() => this.setState({ticketModalVisible: false, currentTicketContent: ""})}>
              关闭
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal show={this.state.knowledgeModalVisible} size='lg'
               onHide={() => this.setState({knowledgeModalVisible: false, currentKnowledge:""})}>
          <Modal.Header closeButton>
            <Modal.Title>知识库详情</Modal.Title>
          </Modal.Header>
          <Modal.Body>{this.state.currentKnowledge}</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => this.setState({knowledgeModalVisible: false, currentKnowledge:""})}>
              关闭
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    );
  }
}


export default PageContent;